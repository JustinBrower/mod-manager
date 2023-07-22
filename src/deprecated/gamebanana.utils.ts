import { gamebanana } from '../deprecated/clients';

export const getItem = async (itemReq: ItemRequest): Promise<ItemResponse> => {
    const item = await gamebanana.Item.getItem({ ...itemReq });
    return item;
};

export const getList = async (listReq: ListRequest): Promise<ListResponse[]> => {
    const list = await gamebanana.List.list({ ...listReq });
    return list;
};

export const getSection = async (sectionReq: SectionRequest): Promise<SectionResponse[]> => {
    const section = await gamebanana.Section.list({ ...sectionReq });
    return section;
};

export const getMemberById = async (id: number): Promise<MemberResponse> => {
    const member = await gamebanana.Member.findByID(id);
    return member;
};

export const getMemberByUsername = async (username: string): Promise<MemberResponse> => {
    const member = await gamebanana.Member.findByName(username);
    return member;
};
