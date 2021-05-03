/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import styled from 'styled-components';
import { MemeList, MemeListAction, MemeListData, MemeListGroup, MemeListItem } from '../domain/meme-list';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const ListGroupName = styled.div`
  color: gray;
`;

const GroupItemsContainer = styled.div`
  padding-left: 8px;
`;

const ListItem = styled.div<{ selected: boolean }>`
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? '#00b0ff3d' : 'transparent')};
`;

interface EntryListingProps { list: MemeList, selectedIndex: number }
function EntryListing({ list, selectedIndex }: EntryListingProps): JSX.Element {
  return (
    <ListContainer>
      {list.groups.map((group) => (
        <ListingGroup group={group} selectedIndex={selectedIndex} key={group.name} />
      ))}
    </ListContainer>
  );
}

interface ListingGroupProps { group: MemeListGroup, selectedIndex: number }
function ListingGroup({ group, selectedIndex }: ListingGroupProps): JSX.Element {
  return (
    <>
      <ListGroupName>{group.name}</ListGroupName>
      <GroupItemsContainer>
        {group.items.map((item) => (
          <ListingItem item={item} selectedIndex={selectedIndex} key={item.name} />
        ))}
      </GroupItemsContainer>
    </>
  );
}

interface ListingItemProps { item: MemeListItem, selectedIndex: number }
function ListingItem({ item, selectedIndex }: ListingItemProps): JSX.Element {
  switch (item.type) {
    case 'MEME_LIST_ACTION': return <ListingActionItem item={item} selectedIndex={selectedIndex} />;
    case 'MEME_LIST_DATA': return <ListingDataItem item={item} selectedIndex={selectedIndex} />;
    default: break;
  }
}

interface ListingDataItemProps {
  item: MemeListData,
  selectedIndex: number,
}

function ListingDataItem({ item, selectedIndex }: ListingDataItemProps): JSX.Element {
  return (
    <ListItem selected={item.index === selectedIndex}>
      {item.name}, {item.url}
    </ListItem>
  );
}

interface ListingActionItemProps {
  item: MemeListAction,
  selectedIndex: number,
}

function ListingActionItem({ item, selectedIndex }: ListingActionItemProps): JSX.Element {
  return (
    <ListItem selected={item.index === selectedIndex}>
      {item.name}, action id: {item.actionId}
    </ListItem>
  );
}

export default EntryListing;
export { EntryListingProps };
