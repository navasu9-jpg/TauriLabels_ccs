
"use client";

import type { FC } from 'react';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import type { CardConfig, CsvData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  data: CsvData;
  config: CardConfig;
  isPrint?: boolean;
}

// TEMPLATE: This component defines the card's visual template.
export const BusinessCard: FC<BusinessCardProps> = ({ data, config, isPrint = false }) => {
  const {
    titleField,
    field1,
    staffIdField,
    qrField,
    qrTemplate,
    cardWidth,
    cardHeight,
    fontSize,
    qrSize,
    showCropMarks,
  } = config;

  const getFieldValue = (field: string) => (field && data[field] ? data[field] : '');
  
  // QR: This section generates the QR code value from a template or a single field.
  const qrValue = qrTemplate
    ? qrTemplate.replace(/{(\w+)}/g, (_, key) => data[key] || '')
    : getFieldValue(qrField);

  const cardStyle = {
    width: `${cardWidth}mm`,
    height: `${cardHeight}mm`,
    fontSize: `${fontSize}pt`,
  };

  const containerClasses = cn(
    'bg-card text-card-foreground overflow-hidden shadow-md relative flex flex-col justify-between p-4',
    'break-inside-avoid',
    showCropMarks && isPrint && 'border border-dashed border-blue-500'
  );

  return (
    <div className={containerClasses} style={cardStyle}>
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            {qrValue && (
              <div>
                <QRCode value={qrValue} size={qrSize} level="M" renderAs="svg" bgColor="transparent" fgColor="currentColor" />
              </div>
            )}
             <div className="mt-2 space-y-1 text-[0.9em]">
              <p className="leading-snug break-words">{getFieldValue(staffIdField)}</p>
              <p className="text-[1em] leading-snug break-words opacity-80">{getFieldValue(field1)}</p>
            </div>
          </div>
            <div className="flex flex-col items-end text-right">
                <div className="relative w-20 h-10">
                    <Image src="/logo.png" alt="Company Logo" fill className="object-contain" />
                </div>
                <div className="text-[0.6em] mt-2 break-words">
                    <p className="text-gray-500">Operations Planning System.</p>
                    <p className="text-gray-500">Authorisation Key</p>
                    <div className="break-words">
                      <p className="text-red-500 mt-1">(If found, please return to PO Box 3167—Room 142)</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h2 className="font-bold text-[1.4em] leading-tight break-words">
            {getFieldValue(titleField)}
          </h2>
        </div>
    </div>
  );
};
