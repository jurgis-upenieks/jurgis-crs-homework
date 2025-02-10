export type ListItem = {
  text: string;
  children: ListItem[];
}

export const parseTextToTree = (text: string): ListItem[] => {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");
  const root: ListItem[] = [];
  const stack: { level: number; items: ListItem[] }[] = [
    { level: -1, items: root },
  ];

  for (const line of lines) {
    const match = line.match(/^(\s*)-\s+(.*)/);
    if (!match) continue;

    const indentSpaces = match[1].length;
    const itemText = match[2].trim();
    const level = indentSpaces / 2;
    const newItem: ListItem = { text: itemText, children: [] };

    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    stack[stack.length - 1].items.push(newItem);
    stack.push({ level, items: newItem.children });
  }

  return root;
}