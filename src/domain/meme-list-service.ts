import { MemeList, MemeListItem } from './meme-list';

interface ListForQueryResult {
  list: MemeList,
  itemCount: number,
}

class MemeListService {
  static getForQuery(query: string): ListForQueryResult {
    const actualQuery = query.toLowerCase();
    const fullList = this.getAllEntries();
    const list = {
      groups: fullList.groups.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.name.toLowerCase().includes(actualQuery)),
      })).filter((group) => group.items.length > 0),
    };

    let currentIndex = 0;
    list.groups = list.groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, index: ++currentIndex })), // eslint-disable-line no-plusplus, max-len
    }));

    return {
      list,
      itemCount: currentIndex,
    };
  }

  private static getAllEntries(): MemeList {
    return {
      groups: [
        {
          name: 'Saved memes',
          items: [
            { type: 'MEME_LIST_DATA', name: 'looking away meme', url: '', index: -1 },
            { type: 'MEME_LIST_DATA', name: 'other meme', url: '', index: -1 },
          ],
        }, {
          name: 'Meme actions',
          items: [
            { type: 'MEME_LIST_ACTION', actionId: 'ADD_MEME', name: 'Add new meme', index: -1 },
          ],
        },
      ],
    };
  }
}

export default MemeListService;
export { ListForQueryResult };
