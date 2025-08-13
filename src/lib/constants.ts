// CONFIG: These are the default settings for the card generator.
export const defaultConfig = {
  csvText:
    'Name,Position,Staff ID\nJohn Doe,Chief Executive Officer,E12345\nJane Smith,Marketing Manager,E12346\nPeter Jones,Chief Financial Officer,E12347\nMary Williams,Chief Operating Officer,E12348\nDavid Brown,IT Director,E12349\nSusan Davis,Human Resources Director,E12350\nMichael Miller,Sales Director,E12351\nLinda Wilson,Product Manager,E12352\nRobert Moore,Software Engineer,E12353\nPatricia Taylor,Graphic Designer,E12354',
  titleField: 'Name',
  field1: 'Position',
  staffIdField: 'Staff ID',
  qrField: 'Staff ID',
  qrTemplate: '',
  cardsPerPageX: 2,
  cardsPerPageY: 5,
  cardWidth: 90,
  cardHeight: 50,
  pageMargin: 5,
  fontSize: 10,
  qrSize: 80,
  showCropMarks: true,
};
