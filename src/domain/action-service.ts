import { clipboard, ipcRenderer, nativeImage } from 'electron';
import { MemeListAction, MemeListData, MemeListItem } from './meme-list';

class ActionService {
  static init() {
    ipcRenderer.on('image-buffer', (event, buffer) => {
      const image = nativeImage.createFromBuffer(buffer);
      clipboard.writeImage(image);
      ipcRenderer.send('hide-entry-window');
    });
  }

  static executeActionFor(item: (MemeListItem | null)) {
    if (item === null) return;
    if (item.type === 'MEME_LIST_DATA') {
      ActionService.executeActionForDataItem(item);
      ipcRenderer.send('hide-entry-window');
    }
  }

  private static executeActionForDataItem(item: MemeListData) {
    if (item.url.endsWith('.png') || item.url.endsWith('.jpg') || item.url.endsWith('.jpeg')) {
      ipcRenderer.send('download-image', item.url);
    } else {
      clipboard.writeText(item.url);
    }
  }
}

export default ActionService;
