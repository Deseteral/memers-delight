import { app, ipcMain, globalShortcut, BrowserWindow, Menu } from 'electron';
import fetch from 'node-fetch';
import { MemeData } from './domain/meme-list';
import { getMemeList, saveMemeList } from './storage';

declare const ENTRY_WINDOW_WEBPACK_ENTRY: any;
declare const ADD_MEME_WINDOW_WEBPACK_ENTRY: any;

let entryWindow: (BrowserWindow | null) = null;
let addMemeWindow: (BrowserWindow | null) = null;

function createEntryWindow() {
  entryWindow = new BrowserWindow({
    width: 400,
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
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addMemeWindow.loadURL(ADD_MEME_WINDOW_WEBPACK_ENTRY);
  // addMemeWindow.webContents.openDevTools();
}

Menu.setApplicationMenu(Menu.buildFromTemplate([{
  label: app.name,
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    { role: 'quit' },
  ],
}]));

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
  createAddMemeWindow();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('hide-entry-window', () => {
  entryWindow?.hide();
  if (!addMemeWindow || !addMemeWindow.isVisible()) {
    app.hide();
  }
});

ipcMain.on('close-add-meme-window', () => {
  addMemeWindow.hide();
});

ipcMain.on('download-image', async (event, url: string) => {
  const data = await fetch(url);
  const buffer = await data.buffer();
  event.reply('image-buffer', buffer);
});

ipcMain.on('open-add-meme-modal', () => {
  addMemeWindow.show();
});

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
