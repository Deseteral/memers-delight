import * as React from 'react';
import styled from 'styled-components';

const EntryInput = styled.input`
  border: none;
  flex: 1;
  outline: none;
  font-size: 24px;
`;

interface MemeEntryProps {
  onChange: (value: string) => void,
}

function MemeEntry({ onChange }: MemeEntryProps): JSX.Element {
  const entryElement = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    entryElement.current.focus();
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') event.preventDefault();
  };

  return (
    <EntryInput
      type="text"
      ref={entryElement}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default MemeEntry;
export { MemeEntryProps };
