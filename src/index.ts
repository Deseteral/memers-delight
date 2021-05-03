import { app, ipcMain, globalShortcut, BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: (BrowserWindow | null) = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  globalShortcut.register('Command+Control+Shift+M', () => mainWindow?.show());
  createWindow();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('hide-entry-window', () => {
  mainWindow?.hide();
});
