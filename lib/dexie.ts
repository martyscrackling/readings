import Dexie, { Table } from "dexie";

export interface ReadingItem {
  id?: number;
  date: string;
  title: string;
  content: any;
}

class ReadingDB extends Dexie {
  readings!: Table<ReadingItem>;

  constructor() {
    super("readingDB");

    this.version(1).stores({
      readings: "++id, date",
    });
  }
}

export const db = new ReadingDB();