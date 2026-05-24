import blessed from "blessed";

export function launchTui(title: string): void {
  const screen = blessed.screen({ smartCSR: true, title });
  const sidebar = blessed.box({ top: 0, left: 0, width: "25%", height: "100%", label: " Project ", border: "line", style: { border: { fg: "magenta" } } });
  const main = blessed.log({ top: 0, left: "25%", width: "75%", height: "100%", label: " Dinus Stream ", border: "line", scrollable: true, alwaysScroll: true, style: { border: { fg: "cyan" } } });
  sidebar.setContent("Dinus Code\nCyberpunk Local Agent\n\nKeys:\nq quit\n");
  screen.append(sidebar);
  screen.append(main);
  screen.key(["q", "C-c"], () => process.exit(0));
  screen.render();
}
