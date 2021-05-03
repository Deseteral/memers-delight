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

interface EntryListingProps { list: MemeList }
function EntryListing({ list }: EntryListingProps): JSX.Element {
  return (
    <ListContainer>
      {list.groups.map((group) => <ListingGroup group={group} />)}
    </ListContainer>
  );
}

interface ListingGroupProps { group: MemeListGroup }
function ListingGroup({ group }: ListingGroupProps): JSX.Element {
  return (
    <>
      <ListGroupName>{group.name}</ListGroupName>
      <GroupItemsContainer>
        {group.items.map((item) => <ListingItem item={item} />)}
      </GroupItemsContainer>
    </>
  );
}

interface ListingItemProps { item: MemeListItem }
function ListingItem({ item }: ListingItemProps): JSX.Element {
  switch (item.type) {
    case 'MEME_LIST_ACTION': return <ListingActionItem item={item} />;
    case 'MEME_LIST_DATA': return <ListingDataItem item={item} />;
    default: break;
  }
}

interface ListingActionItemProps {
  item: MemeListAction,
}

function ListingActionItem({ item }: ListingActionItemProps): JSX.Element {
  return (
    <div>action id: {item.actionId}</div>
  );
}

interface ListingDataItemProps {
  item: MemeListData,
}

function ListingDataItem({ item }: ListingDataItemProps): JSX.Element {
  return (
    <div>{item.name}: {item.url}</div>
  );
}

export default EntryListing;
export { EntryListingProps };
