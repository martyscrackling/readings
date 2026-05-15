import Dexie, { Table } from "dexie";

export interface ReadingItem {
  id?: number;
  date: string;
  title: string;
  content: any;
}

export interface HighlightItem {
  id: string;
  html: string;
}

class ReadingDB extends Dexie {
  readings!: Table<ReadingItem>;
  highlights!: Table<HighlightItem>;

  constructor() {
    super("readingDB");

    this.version(2).stores({
      readings: "++id, date",
      highlights: "id",
    });
  }
}

export const db = new ReadingDB();