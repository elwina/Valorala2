import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async (req, res) => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
  await db.exec('CREATE TABLE tbl (col TEXT)');
  res.status(200).json({ name: 'sqlite' });
};
