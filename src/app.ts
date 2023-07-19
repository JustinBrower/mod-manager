import { getItem, getList, getSection } from './utils/gamebanana.utils';
import {
  getSkins,
  listDirectoryContents,
  validateFolders,
} from './utils/reader.utils';

const directoryPath = '../../Desktop/hdr-backup/ultimate/mods';

async function main() {
  // const item = await getItem({
  //   itemid: 448720, itemtype: 'Mod', fields: ['Category().name'],
  // });
  // await getList({ itemtype: 'Game', query: 'sma', field: 'name' });
  await getSection();
  // await getAllowedFields();
  // console.log(item);
  // const contents = await listDirectoryContents(directoryPath);
  // console.log('Files found: ' + contents.length);
  // console.log(`Directory contents:\n${contents.join('\n')}`);

  // const nonExistingFiles = await validateFolders(
  //   directoryPath,
  //   Constants.FoldersToValidate
  // );
  // if (nonExistingFiles.length > 0) {
  //   console.log(
  //     `Could not find required hdr files:\n${nonExistingFiles.join('\n')}`
  //   );
  // }

  // const skins = await getSkins(directoryPath);
  // console.log('Skins!', skins);
  //   console.log('Skins found: ' + skins.length);
  //   console.log(`Skins:\n${skins.join('\n')}`);
  // }
}

main();
