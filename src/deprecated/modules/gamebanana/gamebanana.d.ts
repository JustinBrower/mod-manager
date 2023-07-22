declare namespace Gamebanana {

    class Client {
        constructor()
        api_key: any;
        appid: any;
        userid: any;
        token: any;
        Item: Item;
        List: List;
        Section: Section;
        NewItems: any;
        Member: Member;
        login: (apiKey?: string) => Promise<any>;
    }

    class Item {
        constructor(req: ItemRequest)
        getItem: (req: ItemRequest) => Promise<ItemResponse>;
        allowedItemTypes: () => Promise<string[]>;
        allowedFields: (itemType: AllowedItemTypes) => Promise<string[]>;
        // data: () => Promise<ItemResponse>;
    }

    class List {
        constructor(req: ListRequest)
        allowedSearchItemTypes: () => Promise<string[]>;
        allowedSearchFields: (itemType: string) => Promise<string[]>;
        list: (req: ListRequest) => Promise<ListResponse[]>;
        // data: () => Promise<ListResponse[]>;
    }

    class Section {
        constructor(req: SectionRequest)
        allowedItemTypes: () => Promise<any>;
        allowedSorts: () => Promise<any>;
        allowedFilters: () => Promise<any>;
        allowedFilterOperators: () => Promise<any>;
        list: (req: SectionRequest) => Promise<SectionResponse[]>;
        // data: () => Promise<SectionResponse[]>;
    }

    class Member {
        constructor()
        findByID: (userid: number) => Promise<any>;
        findByName: (username: string) => Promise<any>;
    }
}

    

declare module 'gamebanana' {
    export = Gamebanana;
}