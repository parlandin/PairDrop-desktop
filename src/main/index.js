import { app, BrowserWindow } from "electron";
import path, { join, resolve } from "path";
import electronSquirrelStartup from "electron-squirrel-startup";
import { session } from "electron";
import "./app/server/app.js";

// close the app if it's installed with squirrel installer (Windows)
if (electronSquirrelStartup) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    maxWidth: 1920,
    maxHeight: 1080,
    fullscreenable: false,
    webPreferences: {
      /*  preload: join(__dirname, "preload.js"), */
      sandbox: false,
      contextIsolation: true,
      webviewTag: false,
    },
  });

  mainWindow.webContents.setUserAgent("pairDrop-desk");
  mainWindow.loadURL(`http://localhost:3000/`);
  mainWindow.webContents.openDevTools();

  mainWindow.maximize();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
