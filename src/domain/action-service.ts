import { clipboard, ipcRenderer } from 'electron';
import { MemeListItem } from './meme-list';

class ActionService {
  static executeActionFor(item: (MemeListItem | null)) {
    if (item === null) return;

    switch (item.type) {
      case 'MEME_LIST_DATA':
        clipboard.writeText(item.url);
        break;
      default: break;
    }

    ipcRenderer.send('hide-entry-window');
  }
}

export default ActionService;
