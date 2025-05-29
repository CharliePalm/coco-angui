export const CLIENT_ID = '71db65b0-7081-7071-3f6f-b386c234050f';

export enum TextBoxType {
  Password = 'password',
  Number = 'number',
  Currency = 'currency',
  None = '',
}

export enum UploadType {
  EventImage = 'EventImage',
  SiteImage = 'SiteImage',
}

export enum CalendarEventStatus {
  Public = 'Public',
  Cancelled = 'Cancelled',
  Private = 'Private',
}

export enum OtherDataType {
  Bio = 'Bio',
}

export const DEFAULT_SCHEMA: EventSchema = {
  Date: 'D',
  Time: 'S',
  Title: 'S',
  Description: 'S',
  Location: 'S',
  Image: 'I',
  Status: Object.keys(CalendarEventStatus),
};

// maps 'title' property to the editable type
export const OtherMap: EventSchema = {
  Bio: 'T',
};

export const SORT_KEY_MAP: { [key: string]: number | undefined } = {
  Title: 5,
  Description: 4,
  Date: 3,
  Time: 2,
  Location: 1,
  Image: -10,
};

export enum DataType {
  CalendarEvent = 'CalendarEvent',
  Image = 'Image',
  Other = 'Other',
  Schema = 'Schema',
}

export enum IconType {
  Trash = 'Trash',
  Plus = 'Plus',
  Minus = 'Minus',
  Check = 'Check',
  X = 'X',
  Edit = 'Edit',
  RightArrowShort = 'RightArrowShort',
  LeftArrowShort = 'LeftArrowShort',
  Play = 'Play',
  Pause = 'Pause',
  Expand = 'Expand',
}

export enum WorkOption {
  Photos = 'Photos',
  Videos = 'Videos',
  Animations = 'Animations',
  Covers = 'Covers',
  Flyers = 'Flyers',
}

export type EventSchema = {
  [key: string]:
    | 'S'
    | 'N'
    | 'D'
    | 'I'
    | 'B'
    | 'T'
    | { [key: string]: string }
    | string[];
}; // string obj/array for select

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id: number;
}

export interface DynamoItem {
  id: string;
  clientId: string;
  type: DataType;
}

export interface ImageLocationInfo {
  location: string;
  num?: number;
}

export interface SchemaItem extends DynamoItem {
  schema?: EventSchema;
  imageLocations?: ImageLocationInfo[];
}

export interface Image extends DynamoItem {
  title: string; // name of file
  location: string; // on site
  value?: string; // image priority
}

export interface CalendarEvent extends DynamoItem {
  id: string;
  clientId: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  bandName?: string;
  cover?: number;
  title: string;
  image?: string;
  ticketLink?: string;
}

export interface OtherItem extends DynamoItem {
  title: string;
  value: string;
  location?: string; // on the site
}

export type UnsortedDynamoItem = CalendarEvent & Image & SchemaItem & OtherItem;
