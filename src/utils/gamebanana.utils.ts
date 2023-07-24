import axios from 'axios';
import { FighterIds } from '../constants';
import { ImageSet, ModData, ModResponse } from '../@types/types';

export const buildUrl = (req: {
  page: number;
  perPage: number;
  fighterId?: number;
}): string => {
  const { page, perPage } = req;
  const baseUrl = 'http://gamebanana.com/apiv11/Mod/';
  const url = `${baseUrl}Index?_nPage=${page}`
    + `&_nPerpage=${perPage}`
    + `&_aFilters%5BGeneric_Category%5D=${req.fighterId || FighterIds.default}`;
  return url;
};

export const buildSearchUrl = (page: number, query: string): string => {
  const queryUrl = `http://gamebanana.com/apiv11/Util/Search/Results?_nPage=${page}&_sModelName=Mod&_sOrder=best_match&_idGameRow=6498&_sSearchString=${query}`;
  return queryUrl;
};

export const fetch = async (url: string): Promise<ModResponse> => {
  const { data } = await axios.get(url);
  return data;
};

export const getImagesFromData = (
  mods: ModData[],
): ImageSet[] => {
  const imgUrls = mods.map(({ _aPreviewMedia: { _aImages }, _idRow }) => ({
    url: `${_aImages[0]._sBaseUrl}/${_aImages[0]._sFile}`,
    id: _idRow,
  }));
  return imgUrls;
};

export const getFormattedData = (rawMods: ModData[], images: ImageSet[]) => {
  const mods = rawMods.map((mod: ModData) => {
    const { _idRow, _sName, _sProfileUrl } = mod;
    return {
      id: _idRow,
      name: _sName,
      url: _sProfileUrl,
      imgUrl: images.find((img) => img.id === _idRow)?.url,
    };
  });
  return mods;
};
