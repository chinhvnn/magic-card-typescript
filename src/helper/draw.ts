const TEXT_DEFAULT = {
  font: '10px Arial',
  textAlign: 'left',
  fillStyle: 'white',
};

export const drawFillRect = (context: CanvasRenderingContext2D, item: any) => {
  const { x, y, width, height, fillStyle } = item;

  context.beginPath();
  context.fillStyle = fillStyle;
  context.fillRect(x, y, width, height);
  context.closePath();
};

export const drawFillCircle = (context: CanvasRenderingContext2D, item: any) => {
  const { x, y, radius, startAngle, endAngle, fillStyle } = item;

  context.beginPath();
  context.fillStyle = fillStyle;
  context.arc(x, y, radius, startAngle, endAngle);
  context.fill();
  context.closePath();
};

export const drawFillText = (context: CanvasRenderingContext2D, item: any, text: string | number) => {
  const { x, y, maxWidth, font, fillStyle, textAlign } = item;

  context.beginPath();
  context.fillStyle = fillStyle || TEXT_DEFAULT.fillStyle;
  context.font = font || TEXT_DEFAULT.font;
  context.save();
  context.textAlign = textAlign || TEXT_DEFAULT.textAlign;
  context.fillText(text.toString(), x, y, maxWidth);
  context.restore();
  context.closePath();
};

export const drawRect = (context: CanvasRenderingContext2D, item: any) => {
  const { x, y, width, height, strokeStyle, lineHeight } = item;

  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.rect(x, y, width, height);
  context.stroke();
  context.closePath();
};
