import { MemeData, MemeList, MemeListItem } from './meme-list';

interface ListForQueryResult {
  list: MemeList,
  itemCount: number,
}

class MemeListService {
  static getForQuery(query: string, memeList: MemeData[]): ListForQueryResult {
    const actualQuery = query.toLowerCase();
    const fullList = MemeListService.getAllEntries(memeList);
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

  static getItemForIndex(list: MemeList, searchIndex: number): (MemeListItem | null) {
    const filteredList = list.groups
      .flatMap((group) => group.items)
      .filter((item) => item.index === searchIndex);

    return filteredList.length === 0 ? null : filteredList[0];
  }

  private static getAllEntries(memeList: MemeData[]): MemeList {
    return {
      groups: [
        {
          name: 'Saved memes',
          items: memeList.map((o) => ({ ...o, type: 'MEME_LIST_DATA', index: -1 })),
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
