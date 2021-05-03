import { clipboard } from 'electron';

const body = document.querySelector('body');
body.addEventListener('keydown', (e) => {
  console.log(e.code);
  if (e.code === 'Enter') {
    clipboard.writeText('hey! my text');
  }
});
