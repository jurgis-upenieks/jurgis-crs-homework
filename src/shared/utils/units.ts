const baseFontSize = 16;

export const rem = (size: number): string => {
  return `${size / baseFontSize}rem`;
}