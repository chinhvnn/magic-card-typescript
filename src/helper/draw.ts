const DEFAULT_FONT_SIZE: number = 12;
const DEFAULT_FONT: string = 'Arial';
const TEXT_DEFAULT = {
  font: `${DEFAULT_FONT_SIZE}px ${DEFAULT_FONT}`,
  textAlign: 'left',
  fillStyle: 'white',
};

export const drawFillRect = (context: CanvasRenderingContext2D, item: any, hasShadow = false) => {
  const { x, y, width, height, fillStyle, shadowColor, shadowBlur } = item;

  context.beginPath();
  context.save();
  if (hasShadow) {
    context.shadowColor = shadowColor;
    context.shadowBlur = shadowBlur;
  }
  context.fillStyle = fillStyle;
  context.fillRect(x, y, width, height);
  context.restore();
  context.closePath();
};

export const drawFillCircle = (context: CanvasRenderingContext2D, item: any) => {
  const { x, y, radius, startAngle, endAngle, fillStyle } = item;

  context.beginPath();
  context.save();
  context.fillStyle = fillStyle;
  context.arc(x, y, radius, startAngle, endAngle);
  context.fill();
  context.restore();
  context.closePath();
};

export const drawFillText = (context: CanvasRenderingContext2D, item: any, text: string | number) => {
  const { x, y, maxWidth, font, textColor, textAlign } = item;

  context.beginPath();
  context.save();
  context.fillStyle = textColor || TEXT_DEFAULT.fillStyle;
  context.font = font || TEXT_DEFAULT.font;
  context.textAlign = textAlign || TEXT_DEFAULT.textAlign;
  context.fillText(text.toString(), x, y, maxWidth);
  context.restore();
  context.closePath();
};

export const drawRect = (context: CanvasRenderingContext2D, item: any) => {
  const { x, y, width, height, strokeStyle, lineHeight } = item;

  context.beginPath();
  context.save();
  context.strokeStyle = strokeStyle;
  context.rect(x, y, width, height);
  context.stroke();
  context.restore();
  context.closePath();
};

export const drawTextBox = (context: CanvasRenderingContext2D, item: any, text: string) => {
  const { x, y, width, height, strokeStyle, font, textAlign, textColor } = item;
  const fontSize = parseInt((font || DEFAULT_FONT).match(/^\d+(?=px)/g)?.[0]) || DEFAULT_FONT_SIZE;
  let xText: number;
  let yText = y + height / 2 + fontSize / 2 - 2;

  if (textAlign === 'center') {
    xText = x + width / 2;
  } else if (textAlign === 'right') {
    xText = x + width + 10;
  } else {
    xText = x + 10;
  }

  context.beginPath();
  context.save();
  context.strokeStyle = strokeStyle;
  context.rect(x, y, width, height);
  context.stroke();
  context.restore();
  context.closePath();

  context.beginPath();
  context.save();
  context.fillStyle = textColor || TEXT_DEFAULT.fillStyle;
  context.font = font || TEXT_DEFAULT.font;
  context.textAlign = textAlign || TEXT_DEFAULT.textAlign;
  context.fillText(text.toString(), xText, yText, width - 20);
  context.restore();
  context.closePath();
};
