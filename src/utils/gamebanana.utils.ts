import { Client, List, Section } from 'gamebanana';
import { BaseItemFields } from '../constants';

export const getItem = async (itemReq: ItemRequest) => {
    const client = new Client();
    const item: ItemResponse = await client.Item.getItem({ ...itemReq, fields: [...BaseItemFields, ...itemReq.fields] });
    console.log(item)
};

export const getList = async (listReq: ListRequest) => {
    const client = new Client();
    const list = new List({ ...listReq });
    const listData = await client.List.list({ ...listReq });
    console.log(listData)
    // const data = await client.List.allowedSearchFields('Game');
    // console.log(data)
};

export const getSection = async () => {
    const request = { direction: 'desc', page: 1, sort: 'id', itemtype: 'Mod' };
    const client = new Client();
    const section = new Section({ ...request });
    const data = await client.Section.list({ ...request });
    console.log(data)

};
