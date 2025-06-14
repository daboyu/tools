import React, { useRef, useState } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const ImageUploadStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const { setImageInfo } = useAppContext();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new window.Image();
    img.onload = () => {
      setImageInfo({ file, url: URL.createObjectURL(file), width: img.width, height: img.height });
      setError('');
      onNext();
    };
    img.onerror = () => setError('無法讀取圖片');
    img.src = URL.createObjectURL(file);
  };

  const handleUrlImport = () => {
    if (!url.trim()) {
      setError('請輸入圖片網址');
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageInfo({ file: null, url, width: img.width, height: img.height });
      setError('');
      onNext();
    };
    img.onerror = () => setError('無法讀取圖片網址');
    img.src = url;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">上傳圖片或貼上 Google 雲端圖片網址</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" component="label">
          上傳圖片
          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
        </Button>
        <TextField
          label="Google 雲端圖片網址"
          value={url}
          onChange={e => setUrl(e.target.value)}
          size="small"
          sx={{ width: 320 }}
        />
        <Button variant="contained" onClick={handleUrlImport}>
          匯入
        </Button>
      </Stack>
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="space-between" width="100%" mt={4}>
        <Button variant="text" onClick={onBack}>上一步</Button>
      </Box>
    </Box>
  );
};

export default ImageUploadStep; 