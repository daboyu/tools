import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const CROP_WIDTH = 3600;
const CROP_HEIGHT = 3200;

const CropStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const { imageInfo, cropArea, setCropArea } = useAppContext();
  const [previewUrl, setPreviewUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageInfo) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 計算等比例縮放後的寬高
      const scale = Math.max(CROP_WIDTH / img.width, CROP_HEIGHT / img.height);
      const drawWidth = Math.round(img.width * scale);
      const drawHeight = Math.round(img.height * scale);
      const offsetX = Math.max(0, (drawWidth - CROP_WIDTH) / 2);
      const offsetY = Math.max(0, (drawHeight - CROP_HEIGHT) / 2);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = CROP_WIDTH;
        canvas.height = CROP_HEIGHT;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, CROP_WIDTH, CROP_HEIGHT);
          ctx.drawImage(
            img,
            -offsetX,
            -offsetY,
            drawWidth,
            drawHeight
          );
          setPreviewUrl(canvas.toDataURL('image/jpeg', 1.0));
        }
      }
      setCropArea({ x: 0, y: 0, width: CROP_WIDTH, height: CROP_HEIGHT });
    };
    img.src = imageInfo.url;
    // eslint-disable-next-line
  }, [imageInfo]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">裁切預覽（3600 x 3200）</Typography>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', borderRadius: 12, border: '1px solid #ccc' }} />
      <Box display="flex" justifyContent="space-between" width="100%" mt={4}>
        <Button variant="text" onClick={onBack}>上一步</Button>
        <Button variant="contained" onClick={onNext} disabled={!previewUrl}>下一步</Button>
      </Box>
    </Box>
  );
};

export default CropStep; 