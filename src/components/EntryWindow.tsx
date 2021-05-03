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

  return (
    <Container>
      <MemeEntry onChange={(value) => setEntryValue(value)} />
    </Container>
  );
}

export default EntryWindow;
export { EntryWindowProps };
