import { app, ipcMain, globalShortcut, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import storage from 'electron-json-storage';
import { MemeData } from './domain/meme-list';

declare const ENTRY_WINDOW_WEBPACK_ENTRY: any;
declare const ADD_MEME_WINDOW_WEBPACK_ENTRY: any;

let entryWindow: (BrowserWindow | null) = null;
let addMemeWindow: (BrowserWindow | null) = null;

function createEntryWindow() {
  entryWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  entryWindow.loadURL(ENTRY_WINDOW_WEBPACK_ENTRY);
  // entryWindow.webContents.openDevTools();
}

function createAddMemeWindow() {
  addMemeWindow = new BrowserWindow({
    title: 'Add new meme',
    width: 500,
    height: 140,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addMemeWindow.loadURL(ADD_MEME_WINDOW_WEBPACK_ENTRY);
  // addMemeWindow.webContents.openDevTools();
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

ipcMain.on('close-add-meme-window', () => {
  addMemeWindow?.close();
});

ipcMain.on('download-image', async (event, url: string) => {
  const data = await fetch(url);
  const buffer = await data.buffer();
  event.reply('image-buffer', buffer);
});

ipcMain.on('open-add-meme-modal', () => {
  createAddMemeWindow();
});

async function getMemeList(): Promise<MemeData[]> {
  return new Promise((resolve, reject) => {
    storage.get('memeList', (err, data: ({ list: MemeData[] })) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.list || []);
    });
  });
}

async function saveMemeList(list: MemeData[]): Promise<void> {
  return new Promise((resolve, reject) => {
    storage.set('memeList', { list }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

ipcMain.on('add-meme', async (event, data: MemeData) => {
  const list = await getMemeList();
  list.push(data);
  saveMemeList(list);
  entryWindow.webContents.send('meme-list-update', list);
});

ipcMain.on('get-meme-list', async (event) => {
  const list = await getMemeList();
  event.reply('meme-list-update', list);
});
