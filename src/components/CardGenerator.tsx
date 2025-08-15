'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Papa from 'papaparse';
import { useToast } from "@/hooks/use-toast";
import { defaultConfig } from '@/lib/constants';
import { formSchema, type CardConfig, type CsvData } from '@/lib/types';
import { SettingsPanel } from './SettingsPanel';
import { PreviewPanel } from './PreviewPanel';
import { PrintLayout } from './PrintLayout';

const LOCAL_STORAGE_KEY = 'savedCsvText';

export function CardGenerator() {
  const [parsedData, setParsedData] = useState<{ headers: string[]; data: CsvData[] }>({ headers: [], data: [] });
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  
  const methods = useForm<CardConfig>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultConfig,
    mode: 'onChange',
  });

  const { watch, setValue } = methods;
  const config = watch();
  const csvText = watch('csvText');

  // Effect to handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to load saved CSV from localStorage on component mount
  useEffect(() => {
    if (isMounted) {
        const savedCsv = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedCsv) {
          setValue('csvText', savedCsv);
        }
    }
  }, [isMounted, setValue]);

  // Effect to parse CSV and save to localStorage on change
  useEffect(() => {
    if (isMounted) {
        // Don't save the default initial text to local storage on first load
        if (csvText && csvText !== defaultConfig.csvText) {
            localStorage.setItem(LOCAL_STORAGE_KEY, csvText);
        }
        
        Papa.parse<CsvData>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              toast({
                variant: 'destructive',
                title: 'CSV Parsing Error',
                description: results.errors.map(e => e.message).join(', '),
              });
              setParsedData({ headers: [], data: [] });
            } else {
              const headers = results.meta.fields || [];
              setParsedData({ headers, data: results.data });
            }
          },
        });
    }
  }, [csvText, toast, isMounted]);

  const handlePrint = () => {
    if (parsedData.data.length > 0) {
      // Use the browser's print dialog which works for both web and Tauri builds
      window.print();
    } else {
      toast({
        variant: 'destructive',
        title: 'Cannot Print',
        description: 'Please provide some CSV data first.',
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let text = (e.target?.result as string) || '';
        // Trim whitespace/newlines, remove BOM and surrounding quotes
        text = text.replace(/^\uFEFF/, '').trim();
        if (text.startsWith('"') && text.endsWith('"')) {
          text = text.slice(1, -1);
        }
        setValue('csvText', text, { shouldDirty: true, shouldValidate: true });
      };
      reader.readAsText(file);
      // Allow uploading the same file again after clearing
      event.target.value = '';
    }
  };

  const handleClear = () => {
    setValue('csvText', '');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setParsedData({ headers: [], data: [] });
  };
  
  // Prevent rendering on the server or until mounted on the client to avoid hydration mismatch
  if (!isMounted) {
    return null; 
  }

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <SettingsPanel
            headers={parsedData.headers}
            recordsCount={parsedData.data.length}
            onPrint={handlePrint}
            onFileChange={handleFileChange}
            onClear={handleClear}
          />
        </div>
        <div className="lg:col-span-2">
          <PreviewPanel data={parsedData.data} config={config} />
        </div>
      </div>
      <PrintLayout data={parsedData.data} config={config} />
    </FormProvider>
  );
}
