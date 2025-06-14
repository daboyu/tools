import React, { useState } from 'react';
import { Container, Paper, Stepper, Step, StepLabel, Box } from '@mui/material';
import ProjectNameStep from './components/ProjectNameStep';
import ImageUploadStep from './components/ImageUploadStep';
import CropStep from './components/CropStep';
import PreviewAndDownloadStep from './components/PreviewAndDownloadStep';
import { AppContextProvider } from './context/AppContext';

const steps = ['專案命名', '上傳/匯入圖片', '裁切設定', '預覽與下載/上傳'];

function App() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AppContextProvider>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box>
            {activeStep === 0 && <ProjectNameStep onNext={() => setActiveStep(1)} />}
            {activeStep === 1 && <ImageUploadStep onNext={() => setActiveStep(2)} onBack={() => setActiveStep(0)} />}
            {activeStep === 2 && <CropStep onNext={() => setActiveStep(3)} onBack={() => setActiveStep(1)} />}
            {activeStep === 3 && <PreviewAndDownloadStep onBack={() => setActiveStep(2)} />}
          </Box>
        </Paper>
      </Container>
    </AppContextProvider>
  );
}

export default App; 