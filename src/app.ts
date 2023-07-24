/* eslint-disable @typescript-eslint/no-unused-vars */
import { FoldersToValidate } from './constants';
import gb from './services/gamebanana.service';
import {
  getSkins,
  listDirectoryContents,
  validateFolders,
} from './utils/reader.utils';

const directoryPath = '../../Desktop/hdr-backup/ultimate/mods';

async function main() {
  const contents = await listDirectoryContents(directoryPath);
  console.log(`Files found: ${contents.length}`);
  console.log(`Directory contents:\n${contents.join('\n')}`);

  const nonExistentFiles = await validateFolders(
    directoryPath,
    FoldersToValidate,
  );
  if (nonExistentFiles.length > 0) {
    console.log(
      `Could not find required hdr files:\n${nonExistentFiles.join('\n')}`,
    );
  }

  const skins = await getSkins(directoryPath);
  console.log('Skins!', skins);
  console.log(`Skins found: ${skins.length}`);
  console.log(`Skins:\n${skins.join('\n')}`);
}

async function getGamebananaData() {
  await gb.search('joker');
  // await getModsList({page: 1, perPage: 15, fighterId: undefined});
}

getGamebananaData();
// main();
