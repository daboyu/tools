# IG Cropper

一鍵將圖片裁切成 IG 拼貼規格，支援本地上傳、Google Drive 圖片匯入、質感 UI、Google Drive 一鍵上傳。

## 功能特色
- 專案命名
- 上傳圖片或貼上 Google 雲端圖片網址
- 自動等比例縮放與裁切 3600x3200
- 3x2 分割成六張 1200x1600
- 每張縮放成高 1350px，寬 1012.5px
- 黑色填充成 1080x1350px
- 六張圖片由右到左、由下到上命名
- 一鍵下載六張圖片
- 一鍵上傳到使用者自己的 Google Drive
- 完全前端運算，不壓縮原圖

## 安裝與開發

1. 安裝依賴
```bash
npm install
```

2. 啟動開發伺服器
```bash
npm run dev
```

3. 打包靜態檔案
```bash
npm run build
```

## 部署到 GitHub Pages

1. 修改 `vite.config.ts` 的 `base` 為你的 repo 名稱（預設已設好 `/ig-cropper/`）
2. 執行：
```bash
npm run build
npm run deploy
```
3. 到 GitHub Pages 設定啟用 gh-pages 分支

## Google Drive 上傳設定

1. 到 [Google Cloud Console](https://console.cloud.google.com/) 建立 OAuth2 憑證，取得 Client ID
2. 將 Client ID 填入 `src/components/PreviewAndDownloadStep.tsx` 的 `CLIENT_ID` 變數
3. 使用者登入 Google 後即可一鍵上傳到自己的雲端

## 目錄結構

- `src/components`：主要步驟元件
- `src/context`：全域狀態管理
- `src/utils`：圖片處理工具
- `src/types`：型別定義

---

如有問題歡迎提 issue！ 