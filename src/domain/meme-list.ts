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
}

interface MemeListData {
  type: 'MEME_LIST_DATA',
  name: string,
  url: string,
}

export {
  MemeList,
  MemeListGroup,
  MemeListItem,
  MemeListAction,
  MemeListData,
};
