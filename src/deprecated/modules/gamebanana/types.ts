type ItemRequest = {
    itemtype: AllowedItemTypes;
    itemid: number;
    fields: AllowedModItemFields[] | AllowedGameItemFields[];
};

type ListRequest = {
    itemtype: AllowedItemTypes;
    query: string;
    field: ListFields;
};

type SectionRequest = {
    itemtype: AllowedItemTypes;
    sort: SectionSorts;
    direction: Direction;
    page: number;
    filter?: SectionFilters;
    filterval?: string;
    filterop?: FilterOperators;
};

type ItemResponse = { [K in AllowedModItemFields | AllowedGameItemFields]?: string; };

type ListResponse = { 
    id: number;
    name?: string;
    member?: any;
};

type SectionResponse = number;

type MemberResponse = {

};

type AllowedModItemFields =
    'apps_used' | 'authors' | 'Category().name' |
    'catid' | 'contestid' | 'creator' |
    'Credits().aAuthors()' | 'Credits().aAuthorsAndGroups()' | 'Credits().ssvAuthorNames()' |
    'date' | 'description' | 'downloads' |
    'feedback_instructions' | 'Files().aFiles()' | 'Flags().aActiveFlagRowIds()' |
    'Flags().bIsFlagged()' | 'Flags().nActiveFlagsCount()' | 'Game().name' |
    'install_instructions' | 'is_obsolete' | 'lastpost_date' |
    'lastpost_userid' | 'likes' | 'mdate' |
    'modnote' | 'name' | 'Nsfw().bIsNsfw()' |
    'obsol_notice' | 'Owner().name' | 'postcount' |
    'Posts().LastPost().idPosterRow()' | 'Posts().LastPost().sText()' | 'Posts().LastPost().tsDateAdded()' |
    'Posts().Postcount().nPostCount()' | 'Preview().sStructuredDataFullsizeUrl()' | 'Preview().sSubFeedImageUrl()' |
    'RootCategory().id' | 'RootCategory().name' | 'screenshots' |
    'studioid' | 'text' | 'Trash().bIsTrashed()' |
    'udate' | 'Updates().aGetLatestUpdates()' | 'Updates().aLatestUpdates()' |
    'Updates().bSubmissionHasUpdates()' | 'Updates().nUpdatesCount()' | 'Url().sDownloadUrl()' |
    'Url().sEditUrl()' | 'Url().sEmbeddablesUrl()' | 'Url().sFlagsUrl()' |
    'Url().sHistoryUrl()' | 'Url().sProfileUrl()' | 'Url().sTrashUrl()' |
    'Url().sUntrashUrl()' | 'Url().sUpdatesUrl()' | 'Url().sWithholdUrl()' |
    'userid' | 'views' | 'Withhold().bIsWithheld()';

type AllowedGameItemFields = 'blurb' | 'completion' | 'Count().bGameHasSubmissions()' |
    'credits' | 'date' | 'developer' |
    'development' | 'full_blurb' | 'full_credits' |
    'mdate' | 'name' | 'Owner().name' |
    'Preview().sStructuredDataFullsizeUrl()' | 'Preview().sSubFeedImageUrl()' | 'publisher' |
    'stage' | 'Trash().bIsTrashed()' | 'Url().sEditUrl()' | 
    'Url().sHistoryUrl()' | 'Url().sProfileUrl()' | 'Url().sTrashUrl()' |
    'Url().sUntrashUrl()' | 'Url().sWithholdUrl()' | 'userid' |
    'version' | 'Withhold().bIsWithheld()';

type AllowedItemTypes =
    'App' | 'Article' | 'ArticleCategory' |
    'BlogCategory' | 'Bug' | 'Blog' |
    'Collection' | 'Club' | 'Clan' |
    'Contest' | 'Concept' | 'ConceptCategory' |
    'ContestCategory' | 'ContestWinner' | 'Event' |
    'EventCategory' | 'Forum' | 'File' |
    'GeneratorCategory' | 'Game' | 'Generator' |
    'Idea' | 'Initiative' | 'Jam' |
    'JamCategory' | 'Mod' | 'Medal' |
    'ModCategory' | 'Model' | 'ModelCategory' |
    'Member' | 'News' | 'NewsCategory' |
    'ProjectCategory' | 'PositionAvailable' | 'Question' |
    'QuestionCategory' | 'Review' | 'Request' |
    'RequestCategory' | 'Staff' | 'Script' |
    'ScriptCategory' | 'Sound' | 'SoundCategory' |
    'StatusUpdate' | 'Support' | 'Thread' |
    'Tool' | 'ToolCategory' | 'Tutorial' |
    'TutorialCategory' | 'Todo' | 'Update' |
    'Wiki' | 'WikiCategory' | 'WareCategory' |
    'Wip' | 'Ware' | 'WareOrder' |
    'WipCategory';

type ListFields = 'name' | 'member';

type SectionFilters = 'userid';

type SectionSorts = 'id' | 'name' | 'udate';

type Direction = 'desc' | 'asc';

type FilterOperators = 'equal_to';