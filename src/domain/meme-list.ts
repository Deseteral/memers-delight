interface MemeList {
  groups: MemeListGroup[],
}

interface MemeListGroup {
  name: string,
  items: MemeListItem[],
}

type MemeListItem =
  | MemeListAction
  | MemeListData;

interface MemeListAction {
  type: 'MEME_LIST_ACTION',
  name: string,
  actionId: string,
  index: number,
}

interface MemeListData {
  type: 'MEME_LIST_DATA',
  name: string,
  url: string,
  index: number,
}

export {
  MemeList,
  MemeListGroup,
  MemeListItem,
  MemeListAction,
  MemeListData,
};
