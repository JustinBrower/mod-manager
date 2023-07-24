import { promisify } from 'util';
import * as fs from 'fs';
import { RequiredFolders } from '../constants';

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);

export const listDirectoryContents = async (
  directoryPath: string,
): Promise<string[]> => {
  const entries = await readdirAsync(directoryPath, { withFileTypes: true });

  const contents = entries
    .map((entry) => {
      if (entry.isDirectory()) {
        return `[Directory] ${entry.name}`;
      } if (entry.isFile()) {
        return `[File] ${entry.name}`;
      }
      return undefined;
    })
    .flatMap((x) => x || []);

  return contents;
};

export const validateFolders = async (
  dir: string,
  folders: string[],
): Promise<string[]> => {
  const entries = await readdirAsync(dir);
  const missingFiles = await Promise.all(folders.map(async (folder) => {
    if (!entries.includes(folder)) {
      return folder;
    }
    const path = `${dir}/${folder}`;
    const file = await statAsync(path);
    if (file && file.isDirectory()) {
      return path;
    }
    return undefined;
  })).then((res) => res.flatMap((x) => x || []));

  return missingFiles;
};

export const isValidSkinFolder = (files: string[]): boolean => {
  let isValid = true;
  RequiredFolders.forEach((folder) => {
    if (!files.includes(folder)) {
      isValid = false;
    }
  });
  return isValid;
};

const isValidFighterFolder = async (fighterPath: string): Promise<boolean> => {
  try {
    const fighterEntries = await readdirAsync(`${fighterPath}`);
    const stats = await statAsync(`${fighterPath}/${fighterEntries[0]}`);
    return !(fighterEntries.length !== 1 || !stats.isDirectory());
  } catch (e) {
    console.log('failed in isValidFighterFolder');
    return false;
  }
};

export const isSkinFolder = async (
  files: string[],
  fullPath: string,
): Promise<boolean> => {
  const hasAllRequiredFiles = isValidSkinFolder(files);
  if (hasAllRequiredFiles) {
    const filteredFiles = files.filter((file) => RequiredFolders.includes(file));
    const isValidResponses = await Promise.all(filteredFiles.map(async (file) => {
      const stats = await statAsync(`${fullPath}/${file}`);
      return stats.isDirectory();
    }));
    const validFighterFolder = await isValidFighterFolder(`${fullPath}/fighter`);
    if (!validFighterFolder || isValidResponses.includes(false)) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

export const getSkins = async (dir: string): Promise<string[]> => {
  const files = await readdirAsync(dir);
  const skins = await Promise.all(files.map(async (file) => {
    const fullPath = `${dir}/${file}`;
    const stats = await statAsync(fullPath);
    if (stats.isDirectory()) {
      const data = await readdirAsync(fullPath);
      if (await isSkinFolder(data, fullPath)) {
        return file;
      }
      return undefined;
    }
    return undefined;
  })).then((res) => res.flatMap(((x) => x || [])));
  return skins;
};
