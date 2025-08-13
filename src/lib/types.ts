import { z } from 'zod';

export const formSchema = z.object({
  csvText: z.string().min(1, 'CSV data cannot be empty.'),
  titleField: z.string(),
  field1: z.string(),
  staffIdField: z.string(),
  qrField: z.string(),
  qrTemplate: z.string(),
  cardsPerPageX: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(1),
  cardsPerPageY: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(1),
  cardWidth: z.coerce.number({invalid_type_error: "Must be a number"}).min(1),
  cardHeight: z.coerce.number({invalid_type_error: "Must be a number"}).min(1),
  pageMargin: z.coerce.number({invalid_type_error: "Must be a number"}).min(0),
  fontSize: z.coerce.number({invalid_type_error: "Must be a number"}).min(1),
  qrSize: z.coerce.number({invalid_type_error: "Must be a number"}).min(1),
  showCropMarks: z.boolean(),
});

export type CardConfig = z.infer<typeof formSchema>;
export type CsvData = { [key: string]: string };
