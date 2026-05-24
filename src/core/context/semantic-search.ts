import Fuse from "fuse.js";
import type { IndexedFile } from "./indexer.js";

export class SemanticSearch {
  private fuse: Fuse<IndexedFile>;

  constructor(index: IndexedFile[]) {
    this.fuse = new Fuse(index, { keys: ["path", "symbols", "content"], threshold: 0.35 });
  }

  query(text: string, limit = 5): IndexedFile[] {
    return this.fuse.search(text, { limit }).map((r) => r.item);
  }
}
