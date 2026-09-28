/** Keep each fixture-rig line legible even for the longest venue names. */
export function venueHeadingLines(name: string): string[] {
  const lines = ["The room:"];
  let line = "";
  for (const word of `${name}.`.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > 15) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}
