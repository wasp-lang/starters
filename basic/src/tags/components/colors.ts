export function generateBrightColor(
  hue = Math.floor(Math.random() * 360),
): string {
  const saturation = 100;
  const lightness = 65;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
