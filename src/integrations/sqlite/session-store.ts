import path from "node:path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Message } from "../../types/index.js";

export class SessionStore {
  private dbPromise = open({ filename: path.join(process.cwd(), ".dinus", "sessions.db"), driver: sqlite3.Database });

  async init(): Promise<void> {
    const db = await this.dbPromise;
    await db.exec(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, role TEXT, content TEXT, ts INTEGER)`);
  }

  async addMessage(message: Message): Promise<void> {
    const db = await this.dbPromise;
    await db.run("INSERT INTO messages (role, content, ts) VALUES (?, ?, ?)", message.role, message.content, message.timestamp);
  }

  async recent(limit = 20): Promise<Message[]> {
    const db = await this.dbPromise;
    const rows = await db.all<{ role: Message['role']; content: string; ts: number }[]>(
      "SELECT role, content, ts FROM messages ORDER BY id DESC LIMIT ?",
      limit
    );
    return rows.reverse().map((r) => ({ role: r.role, content: r.content, timestamp: r.ts }));
  }
}
