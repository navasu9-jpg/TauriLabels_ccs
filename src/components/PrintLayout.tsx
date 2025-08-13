
"use client";

import type { FC } from 'react';
import { BusinessCard } from './BusinessCard';
import type { CardConfig, CsvData } from '@/lib/types';

interface PrintLayoutProps {
  data: CsvData[];
  config: CardConfig;
}

// LAYOUT/PRINT: This component handles the print layout, pagination, and margins.
export const PrintLayout: FC<PrintLayoutProps> = ({ data, config }) => {
  const { cardsPerPageX, cardsPerPageY, pageMargin, cardWidth, cardHeight } = config;
  const cardsPerPage = cardsPerPageX * cardsPerPageY;

  const pages = [];
  for (let i = 0; i < data.length; i += cardsPerPage) {
    pages.push(data.slice(i, i + cardsPerPage));
  }

  const pageStyle = {
    padding: `${pageMargin}mm`,
  };

  // A4 dimensions in mm: 210 x 297
  const availableWidth = 210 - (2 * pageMargin);
  const availableHeight = 297 - (2 * pageMargin);
  
  const totalCardsWidth = cardsPerPageX * cardWidth;
  const totalCardsHeight = cardsPerPageY * cardHeight;

  // Distribute remaining space evenly between cards
  const totalGapX = availableWidth - totalCardsWidth;
  const totalGapY = availableHeight - totalCardsHeight;
  
  const gapX = cardsPerPageX > 1 ? totalGapX / (cardsPerPageX) : 0;
  const gapY = cardsPerPageY > 1 ? totalGapY / (cardsPerPageY) : 0;

  const gridStyle = {
    gridTemplateColumns: `repeat(${cardsPerPageX}, ${cardWidth}mm)`,
    gridTemplateRows: `repeat(${cardsPerPageY}, ${cardHeight}mm)`,
    gap: `${gapY < 0 ? 0 : gapY}mm ${gapX < 0 ? 0 : gapX}mm`,
    justifyContent: 'center',
    alignContent: 'center'
  };

  return (
    <div className="print-container">
      {pages.map((pageData, pageIndex) => (
        <div
          key={pageIndex}
          className="print-page w-[210mm] h-[297mm] box-border grid"
          style={{ ...pageStyle, ...gridStyle }}
        >
          {pageData.map((record, recordIndex) => (
            <BusinessCard key={recordIndex} data={record} config={config} isPrint={true} />
          ))}
        </div>
      ))}
    </div>
  );
};
