import { ipcRenderer } from 'electron';
import * as React from 'react';
import styled from 'styled-components';
import MemeListService from '../domain/meme-list-service';
import ActionService from '../domain/action-service';
import EntryListing from './EntryListing';
import MemeEntry from './MemeEntry';

const Container = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

function EntryWindow(): JSX.Element {
  const [entryValue, setEntryValue] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0); // TODO: Move to context
  const { list, itemCount } = MemeListService.getForQuery(entryValue);

  React.useEffect(() => {
    ActionService.init();

    ipcRenderer.on('will-show-window', (event) => {
      setEntryValue('');
      setSelectedIndex(0);
    });
  }, []);

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
      case 'Enter': {
        const item = MemeListService.getItemForIndex(list, selectedIndex);
        ActionService.executeActionFor(item);
      } return;
      case 'Escape':
        ipcRenderer.send('hide-entry-window');
        return;
      default: break;
    }

    if (idx < 0) idx = (itemCount);
    if (idx > itemCount) idx = 0;
    setSelectedIndex(idx);
  };

  return (
    <Container onKeyDown={handleKeyDown}>
      <MemeEntry value={entryValue} onChange={handleEntryChange} />
      {list.groups.length > 0 && (
        <EntryListing list={list} selectedIndex={selectedIndex} />
      )}
    </Container>
  );
}

export default EntryWindow;
