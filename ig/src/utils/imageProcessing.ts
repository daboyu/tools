// 將 3600x3200 圖片分割成 3x2 共六張 1200x1600
export function splitImageToSix(canvas: HTMLCanvasElement): HTMLCanvasElement[] {
  const result: HTMLCanvasElement[] = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 2; col >= 0; col--) {
      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 1600;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(
        canvas,
        col * 1200,
        row * 1600,
        1200,
        1600,
        0,
        0,
        1200,
        1600
      );
      result.push(c);
    }
  }
  return result;
}

// 將每張 1200x1600 圖片縮放成高 1350，寬等比例
export function scaleTo1350(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const scale = 1350 / 1600;
  const w = 1200 * scale;
  const h = 1350;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(canvas, 0, 0, w, h);
  return c;
}

// 將圖片黑邊填充成 1080x1350
export function padTo1080x1350(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 1080;
  c.height = 1350;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1080, 1350);
  // 圖片置中
  const x = (1080 - canvas.width) / 2;
  ctx.drawImage(canvas, x, 0);
  return c;
} 