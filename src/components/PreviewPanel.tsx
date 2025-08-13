
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessCard } from './BusinessCard';
import type { CardConfig, CsvData } from '@/lib/types';

interface PreviewPanelProps {
  data: CsvData[];
  config: CardConfig;
}

export const PreviewPanel: FC<PreviewPanelProps> = ({ data, config }) => {
  const previewData = data.slice(0, 10);

  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${config.cardWidth}mm, 1fr))`,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>A preview of your generated cards. Up to 10 are shown here.</CardDescription>
      </CardHeader>
      <CardContent>
        {previewData.length > 0 ? (
          <div className="grid gap-4" style={gridStyle}>
            {previewData.map((record, index) => (
              <BusinessCard key={index} data={record} config={config} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Paste CSV data to see a preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
