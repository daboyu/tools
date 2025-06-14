import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const ProjectNameStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { projectName, setProjectName } = useAppContext();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!projectName.trim()) {
      setError('請輸入專案名稱');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        為你的圖片專案命名
      </Typography>
      <TextField
        label="專案名稱"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        error={!!error}
        helperText={error}
        fullWidth
        inputProps={{ maxLength: 30 }}
      />
      <Button variant="contained" size="large" onClick={handleNext} sx={{ mt: 2, width: 180 }}>
        下一步
      </Button>
    </Box>
  );
};

export default ProjectNameStep; 