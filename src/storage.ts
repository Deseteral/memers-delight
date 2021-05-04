import storage from 'electron-json-storage';
import { MemeData } from './domain/meme-list';

async function getMemeList(): Promise<MemeData[]> {
  return new Promise((resolve, reject) => {
    storage.get('memeList', (err, data: ({ list: MemeData[] })) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.list || []);
    });
  });
}

async function saveMemeList(list: MemeData[]): Promise<void> {
  return new Promise((resolve, reject) => {
    storage.set('memeList', { list }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export {
  getMemeList,
  saveMemeList,
};
