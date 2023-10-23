const TEXT_DEFAULT = {
  font: '12px Arial',
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
  const { x, y, maxWidth, font, fillStyle, textAlign } = item;

  context.beginPath();
  context.save();
  context.fillStyle = fillStyle || TEXT_DEFAULT.fillStyle;
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
