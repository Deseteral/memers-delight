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
    if (item?.type === 'MEME_LIST_DATA') {
      ActionService.executeActionForUrl(item.url);
      ipcRenderer.send('hide-entry-window');
    }

    if (item?.type === 'MEME_LIST_ACTION') {
      ActionService.executeActionForActionItem(item);
      ipcRenderer.send('hide-entry-window');
    }
  }

  static executeActionForUrl(url: string) {
    if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
      ipcRenderer.send('download-image', url);
    } else {
      clipboard.writeText(url);
    }
  }

  private static executeActionForActionItem(item: MemeListAction) {
    switch (item.actionId) {
      case 'ADD_MEME':
        ActionService.openAddMemeModal();
        break;
      default: break;
    }
  }

  private static openAddMemeModal() {
    ipcRenderer.send('open-add-meme-modal');
  }
}

export default ActionService;
