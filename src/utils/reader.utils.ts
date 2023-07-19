import { promisify } from 'util';
import { RequiredFolders } from '../constants';
import * as fs from 'fs';

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);

export const listDirectoryContents = async (
  directoryPath: string
): Promise<string[]> => {
  const contents: string[] = [];
  const entries = await readdirAsync(directoryPath, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      contents.push(`[Directory] ${entry.name}`);
    } else if (entry.isFile()) {
      contents.push(`[File] ${entry.name}`);
    }
  });

  return contents;
};

export const validateFolders = async (
  dir: string,
  folders: string[]
): Promise<string[]> => {
  const entries = await readdirAsync(dir);
  const missingFiles: string[] = [];
  for (const folder of folders) {
    if (!entries.includes(folder)) {
      missingFiles.push(folder);
    } else {
      const path = `${dir}/${folder}`;
      const file = await statAsync(path);
      if (file && file.isDirectory()) {
        // console.log('found!', path);
      }
    }
  }
  return missingFiles;
};

export const getSkins = async (dir: string): Promise<string[]> => {
  const skins: string[] = [];
  const files = await readdirAsync(dir);
  for (const file of files) {
    const fullPath = `${dir}/${file}`;
    const stats = await statAsync(fullPath);
    if (stats.isDirectory()) {
      const data = await readdirAsync(fullPath);
      if (await isSkinFolder(data, fullPath)) {
        skins.push(file);
      }
    }
  }
  return skins;
};

export const isSkinFolder = async (
  files: string[],
  fullPath: string
): Promise<boolean> => {
  let isValid = true;
  const hasAllRequiredFiles = isValidSkinFolder(files);
  if (hasAllRequiredFiles) {
    const filteredFiles = files.filter((file) =>
      RequiredFolders.includes(file)
    );
    for (const file of filteredFiles) {
      const stats = await statAsync(`${fullPath}/${file}`);
      const isDirectory = stats.isDirectory();
      if (!isDirectory) {
        isValid = false;
      }
    }
    const validFighterFolder = await isValidFighterFolder(
      `${fullPath}/fighter`
    );
    if (!validFighterFolder) {
      isValid = false;
    }
  } else {
    isValid = false;
  }
  // console.log(fullPath, isValid);
  return isValid;
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
  } catch (e: any) {
    console.log('failed in isValidFighterFolder');
    return false;
  }
};
