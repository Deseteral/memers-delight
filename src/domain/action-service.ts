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

    switch (item.type) {
      case 'MEME_LIST_DATA':
        ActionService.executeActionForDataItem(item);
        break;
      case 'MEME_LIST_ACTION':
        ActionService.executeActionForActionItem(item);
        break;
      default: break;
    }

    ipcRenderer.send('hide-entry-window');
  }

  private static executeActionForDataItem(item: MemeListData) {
    if (item.url.endsWith('.png') || item.url.endsWith('.jpg') || item.url.endsWith('.jpeg')) {
      ipcRenderer.send('download-image', item.url);
    } else {
      clipboard.writeText(item.url);
    }
  }

  private static executeActionForActionItem(item: MemeListAction) {

  }
}

export default ActionService;
