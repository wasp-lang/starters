export interface ColorOption {
  color: string | undefined;
  bg: string;
}

export const COLORS: ColorOption[] = [
  {
    color: undefined,
    bg: `\
      conic-gradient(
        hsl(360 100% 50%),
        hsl(315 100% 50%),
        hsl(270 100% 50%),
        hsl(225 100% 50%),
        hsl(180 100% 50%),
        hsl(135 100% 50%),
        hsl(90 100% 50%),
        hsl(45 100% 50%),
        hsl(0 100% 50%)
      )`,
  },
  ...generateBrightColors(),
];

function generateBrightColors(): ColorOption[] {
  const colors: ColorOption[] = [];
  for (let hue = 0; hue <= 360; hue += 30) {
    const hslColor = `hsl(${hue}, 100%, 65%)`;
    colors.push({ bg: hslColor, color: hslColor });
  }
  return colors;
}
