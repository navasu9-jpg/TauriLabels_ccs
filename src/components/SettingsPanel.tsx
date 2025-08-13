
"use client";

import type { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { CardConfig } from '@/lib/types';
import { Printer, Trash2 } from 'lucide-react';

interface SettingsPanelProps {
  headers: string[];
  recordsCount: number;
  onPrint: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const SettingsPanel: FC<SettingsPanelProps> = ({ headers, recordsCount, onPrint, onFileChange, onClear }) => {
  const form = useFormContext<CardConfig>();

  const renderSelectOptions = () => {
    if (headers.length === 0) {
      return <SelectItem value="-" disabled>No columns found</SelectItem>;
    }
    return headers.map((header) => (
      <SelectItem key={header} value={header}>{header}</SelectItem>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Printer Pro</CardTitle>
        <CardDescription>Generate print-ready cards from your CSV data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <FormField
            control={form.control}
            name="csvText"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>1. Paste CSV Data</FormLabel>
                  <Button variant="ghost" size="sm" onClick={onClear}><Trash2 className="mr-2 h-4 w-4" />Clear</Button>
                </div>
                <FormControl>
                  <Textarea placeholder="name,title,email..." className="min-h-[150px] font-mono text-sm" {...field} />
                </FormControl>
                <FormDescription>
                  The first row should contain headers. Parsed {recordsCount} records.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="mt-4">
              <FormLabel>Or Upload CSV File</FormLabel>
              <FormControl>
                <Input type="file" accept=".csv" onChange={onFileChange} className="mt-1" />
              </FormControl>
            </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium mb-2">2. Map Columns</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="titleField" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger></FormControl><SelectContent>{renderSelectOptions()}</SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="field1" render={({ field }) => (
              <FormItem><FormLabel>Position</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger></FormControl><SelectContent>{renderSelectOptions()}</SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="staffIdField" render={({ field }) => (
              <FormItem><FormLabel>Staff ID</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger></FormControl><SelectContent>{renderSelectOptions()}</SelectContent></Select><FormMessage /></FormItem>
            )} />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium mb-2">3. QR Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="qrField" render={({ field }) => (
              <FormItem><FormLabel>QR Data Source</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger></FormControl><SelectContent>{renderSelectOptions()}</SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="qrTemplate" render={({ field }) => (
              <FormItem><FormLabel>QR Template (optional)</FormLabel><FormControl><Input placeholder="vcard:{name};{email}" {...field} /></FormControl></FormItem>
            )} />
          </div>
        </div>
        <Separator />
        <div>
            <h3 className="text-lg font-medium mb-2">4. Layout (in mm/pt)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="cardWidth" render={({ field }) => (<FormItem><FormLabel>Card Width</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="cardHeight" render={({ field }) => (<FormItem><FormLabel>Card Height</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="pageMargin" render={({ field }) => (<FormItem><FormLabel>Page Margin</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="fontSize" render={({ field }) => (<FormItem><FormLabel>Font Size</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="cardsPerPageX" render={({ field }) => (<FormItem><FormLabel>Cards per page (X)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="cardsPerPageY" render={({ field }) => (<FormItem><FormLabel>Cards per page (Y)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <FormField control={form.control} name="qrSize" render={({ field }) => (<FormItem><FormLabel>QR Size (px)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
            </div>
        </div>
        <Separator />
        <div>
            <h3 className="text-lg font-medium mb-2">5. Print Options</h3>
            <FormField control={form.control} name="showCropMarks" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Show Crop Marks</FormLabel><FormDescription>Display crop marks for easy cutting.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onPrint} size="lg" className="w-full" disabled={recordsCount === 0}><Printer className="mr-2 h-4 w-4" />Print Cards</Button>
      </CardFooter>
    </Card>
  );
};
