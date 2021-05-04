import './index.css';
import { clipboard, ipcRenderer } from 'electron';
import ActionService from '../domain/action-service';

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name-input') as HTMLInputElement;
  const urlInput = document.getElementById('url-input') as HTMLInputElement;
  const cancelButton = document.getElementById('cancel-button') as HTMLButtonElement;
  const addButton = document.getElementById('add-button') as HTMLButtonElement;

  function closeWindow() {
    ipcRenderer.send('close-add-meme-window');
  }

  function addMeme() {
    const name = nameInput.value;
    const url = urlInput.value;

    if (name.length === 0 || url.length === 0) {
      window.alert('Please fill the required fields');
      return;
    }

    ipcRenderer.send('add-meme', { name, url });
    ActionService.executeActionForUrl(url);
    closeWindow();
  }

  cancelButton.addEventListener('click', () => closeWindow());
  addButton.addEventListener('click', () => addMeme());
  nameInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') addMeme();
    if (event.code === 'Escape') closeWindow();
  });
  urlInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') addMeme();
    if (event.code === 'Escape') closeWindow();
  });

  // If clipboard contains URL, auto paste it into URL input field
  const clipboardContents = clipboard.readText();
  if (clipboardContents.startsWith('http')) {
    urlInput.value = clipboardContents;
  }
});
