import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { splitImageToSix, scaleTo1350, padTo1080x1350 } from '../utils/imageProcessing';

const CLIENT_ID = '490696484271-c1hb2vd0fpjdkq4gau8ttn49e08h3euq.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const PreviewAndDownloadStep: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { projectName, cropArea, croppedImages, setCroppedImages } = useAppContext();
  const [processing, setProcessing] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [auth, setAuth] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const previewRef = useRef<HTMLCanvasElement>(null);

  // 產生六張圖片
  useEffect(() => {
    if (!previewRef.current) return;
    setProcessing(true);
    setTimeout(() => {
      const six = splitImageToSix(previewRef.current!);
      const scaled = six.map(scaleTo1350);
      const padded = scaled.map(padTo1080x1350);
      setCroppedImages(padded.map(c => c.toDataURL('image/jpeg', 1.0)));
      setProcessing(false);
    }, 100);
    // eslint-disable-next-line
  }, [previewRef.current]);

  // 載入 gapi 並初始化
  useEffect(() => {
    if (gapiLoaded) return;
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      // @ts-ignore
      window.gapi.load('client:auth2', async () => {
        // @ts-ignore
        await window.gapi.client.init({
          clientId: CLIENT_ID,
          scope: SCOPE,
        });
        // @ts-ignore
        setAuth(window.gapi.auth2.getAuthInstance());
        setGapiLoaded(true);
      });
    };
    document.body.appendChild(script);
    // eslint-disable-next-line
  }, []);

  // 下載單張
  const handleDownload = (dataUrl: string, idx: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${projectName || 'IG'}_${idx + 1}.jpg`;
    a.click();
  };

  // 一鍵下載
  const handleDownloadAll = () => {
    croppedImages.forEach((img, idx) => handleDownload(img, idx));
  };

  // Google 登入
  const handleLogin = async () => {
    if (!auth) return;
    await auth.signIn();
  };

  // 上傳到 Google Drive
  const handleUploadAll = async () => {
    if (!gapiLoaded || !auth || !auth.isSignedIn.get()) {
      setUploadMsg('請先登入 Google 帳號');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      // @ts-ignore
      const gapi = window.gapi;
      for (let i = 0; i < croppedImages.length; i++) {
        const img = croppedImages[i];
        const byteString = atob(img.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let j = 0; j < byteString.length; j++) ia[j] = byteString.charCodeAt(j);
        const blob = new Blob([ab], { type: 'image/jpeg' });
        const metadata = {
          name: `${projectName || 'IG'}_${i + 1}.jpg`,
          mimeType: 'image/jpeg',
        };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);
        await gapi.client.request({
          path: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
          method: 'POST',
          params: { uploadType: 'multipart' },
          headers: { 'Content-Type': undefined },
          body: form,
        });
      }
      setUploadMsg('全部上傳成功！');
    } catch (e) {
      setUploadMsg('上傳失敗，請重試');
    }
    setUploading(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">預覽與下載/上傳</Typography>
      <canvas ref={previewRef} width={3600} height={3200} style={{ display: 'none' }} />
      {processing ? (
        <CircularProgress />
      ) : (
        <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
          {croppedImages.map((img, idx) => (
            <Box key={idx}>
              <img
                src={img}
                alt={`IG_${idx + 1}`}
                style={{ width: 108, height: 135, objectFit: 'cover', borderRadius: 8, margin: 4, border: '1px solid #eee' }}
              />
              <Button size="small" onClick={() => handleDownload(img, idx)} sx={{ mt: 1 }}>
                下載
              </Button>
            </Box>
          ))}
        </Stack>
      )}
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={handleDownloadAll} disabled={processing || !croppedImages.length}>
          一鍵下載全部
        </Button>
        <Button variant="outlined" onClick={handleLogin} disabled={!gapiLoaded || (auth && auth.isSignedIn.get())}>
          {auth && auth.isSignedIn.get() ? '已登入 Google' : '登入 Google'}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleUploadAll} disabled={!gapiLoaded || !auth || !auth.isSignedIn.get() || uploading}>
          {uploading ? <CircularProgress size={20} /> : '一鍵上傳到 Google Drive'}
        </Button>
      </Stack>
      {uploadMsg && <Typography color={uploadMsg.includes('成功') ? 'primary' : 'error'}>{uploadMsg}</Typography>}
      <Box display="flex" justifyContent="space-between" width="100%" mt={4}>
        <Button variant="text" onClick={onBack}>上一步</Button>
      </Box>
    </Box>
  );
};

export default PreviewAndDownloadStep; 