import { buildUrl, fetch, getImagesFromData, getFormattedData, buildSearchUrl } from "../utils/gamebanana.utils";


class Gamebanana {
    constructor() { }
    async getModsList(req: { page: number; perPage: number; fighterId?: number; }) {
        const url = buildUrl({ ...req });
        const {_aRecords: rawMods} = await fetch(url);
        const images = getImagesFromData(rawMods);
        const mods = getFormattedData(rawMods, images);
        console.log(mods);
        return mods;
    };
    
    async search(query: string, page?: number) {
        if (query.length < 2) {
            throw new Error('Query must be 2 characters or more');
        }
        const url = buildSearchUrl(page || 1, query);
        const {_aRecords: rawMods} = await fetch(url);
        const images = getImagesFromData(rawMods);
        const mods = getFormattedData(rawMods, images);
        console.log(mods);
        return mods;
    }
}
export const gb = new Gamebanana();