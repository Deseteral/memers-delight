import { app, ipcMain, globalShortcut, BrowserWindow } from 'electron';
import fetch from 'node-fetch';

declare const ENTRY_WINDOW_WEBPACK_ENTRY: any;

let entryWindow: (BrowserWindow | null) = null;

function createEntryWindow() {
  entryWindow = new BrowserWindow({
    height: 600,
    width: 800,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  entryWindow.loadURL(ENTRY_WINDOW_WEBPACK_ENTRY);
  entryWindow.webContents.openDevTools();
}

app.on('ready', () => {
  globalShortcut.register('Command+Control+Shift+M', () => {
    if (!entryWindow) return;

    entryWindow.webContents.send('will-show-window');
    entryWindow.setVisibleOnAllWorkspaces(true);
    entryWindow.focus();
    entryWindow.setVisibleOnAllWorkspaces(false);
    entryWindow.show();
  });
  createEntryWindow();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createEntryWindow();
  }
});

ipcMain.on('hide-entry-window', () => {
  entryWindow?.hide();
});

ipcMain.on('download-image', async (event, url) => {
  const data = await fetch(url);
  const buffer = await data.buffer();
  event.reply('image-buffer', buffer);
});

ipcMain.on('open-add-meme-modal', () => {

});
