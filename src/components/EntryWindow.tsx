import * as React from 'react';
import styled from 'styled-components';
import MemeEntry from './MemeEntry';

const Container = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
`;

interface EntryWindowProps { }

function EntryWindow(props: EntryWindowProps): JSX.Element {
  const [entryValue, setEntryValue] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

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
      default: break;
    }

    if (idx < 0) idx = 0;
    setSelectedIndex(idx);
    console.log(idx);
  };

  return (
    <Container onKeyDown={handleKeyDown}>
      <MemeEntry onChange={handleEntryChange} />
    </Container>
  );
}

export default EntryWindow;
export { EntryWindowProps };
