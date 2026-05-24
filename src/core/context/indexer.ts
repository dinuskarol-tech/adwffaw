import { promises as fs } from "node:fs";
import path from "node:path";
import Parser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";

export interface IndexedFile {
  path: string;
  symbols: string[];
  content: string;
}

export class CodeIndexer {
  private parser = new Parser();

  constructor() {
    this.parser.setLanguage(JavaScript);
  }

  async indexWorkspace(root: string): Promise<IndexedFile[]> {
    const files = await this.collectFiles(root);
    const out: IndexedFile[] = [];
    for (const file of files) {
      const content = await fs.readFile(file, "utf8");
      const tree = this.parser.parse(content);
      const symbols: string[] = [];
      const walk = (node: Parser.SyntaxNode): void => {
        if (["function_declaration", "class_declaration", "method_definition"].includes(node.type)) {
          symbols.push(node.text.slice(0, 120));
        }
        node.children.forEach(walk);
      };
      walk(tree.rootNode);
      out.push({ path: file, symbols, content });
    }
    return out;
  }

  private async collectFiles(root: string): Promise<string[]> {
    const entries = await fs.readdir(root, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(root, entry.name);
      if (entry.isDirectory()) files.push(...(await this.collectFiles(full)));
      else if (/\.(ts|js|tsx|jsx|mjs|cjs)$/.test(entry.name)) files.push(full);
    }
    return files;
  }
}
