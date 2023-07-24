export type MetaData = {
  warnings: string[];
  errors: string[];
  info: string[];
};

export type ImageSet = {
  id: number;
  url: string;
};

export type ImageData = {
  _sBaseUrl: string;
  _sFile: string;
};

export type PreviewMediaData = {
  _aImages: ImageData[];
};

export type ModData = {
  _idRow: number;
  _aPreviewMedia: PreviewMediaData;
  _sName: string;
  _sProfileUrl: string;
};

export type ModResponse = {
  _aRecords: ModData[];
};
