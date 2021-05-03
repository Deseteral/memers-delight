import { MemeList, MemeListItem } from './meme-list';

class MemeListService {
  static getForQuery(query: string): MemeList {
    const actualQuery = query.toLowerCase();
    const fullList = this.getAllEntries();
    const list = {
      groups: fullList.groups.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.name.toLowerCase().includes(actualQuery)),
      })).filter((group) => group.items.length > 0),
    };

    return list;
  }

  private static getAllEntries(): MemeList {
    return {
      groups: [
        {
          name: 'Saved memes',
          items: [
            { type: 'MEME_LIST_DATA', name: 'looking away meme', url: '' },
            { type: 'MEME_LIST_DATA', name: 'other meme', url: '' },
          ],
        }, {
          name: 'Meme actions',
          items: [
            { type: 'MEME_LIST_ACTION', actionId: 'ADD_MEME', name: 'Add new meme' },
          ],
        },
      ],
    };
  }
}

export default MemeListService;
