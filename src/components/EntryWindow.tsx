import * as React from 'react';
import styled from 'styled-components';
import MemeListService from '../domain/meme-list-service';
import { MemeList } from '../domain/meme-list';
import EntryListing from './EntryListing';
import MemeEntry from './MemeEntry';

const Container = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

interface EntryWindowProps { }

function EntryWindow(props: EntryWindowProps): JSX.Element {
  const [entryValue, setEntryValue] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const { list, itemCount } = MemeListService.getForQuery(entryValue);

  const handleEntryChange = (value: string) => {
    setEntryValue(value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let idx = selectedIndex;

    switch (event.code) {
      case 'ArrowUp':
        idx -= 1;
        break;
      case 'ArrowDown':
        idx += 1;
        break;
      case 'Enter':
        console.log(MemeListService.getItemForIndex(list, selectedIndex));
        break;
      default: break;
    }

    if (idx < 0) idx = (itemCount);
    if (idx > itemCount) idx = 0;
    setSelectedIndex(idx);
  };

  return (
    <Container onKeyDown={handleKeyDown}>
      <MemeEntry onChange={handleEntryChange} />
      {list.groups.length > 0 && (
        <EntryListing list={list} selectedIndex={selectedIndex} />
      )}
    </Container>
  );
}

export default EntryWindow;
export { EntryWindowProps };
