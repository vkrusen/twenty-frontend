export type Attachment = {
  id: string;
  name: string;
  fullPath: string;
  type: AttachmentType;
  companyId: string;
  personId: string;
  activityId: string;
  authorId: string;
  createdAt: string;
};
export type AttachmentType =
  | 'Archive'
  | 'Audio'
  | 'Image'
  | 'Presentation'
  | 'Spreadsheet'
  | 'TextDocument'
  | 'Video'
  | 'Other';
