import AlgoliaSearch from 'algoliasearch';

// avoid mutations detection since algolia client & index object
// are mutating between themself
const _clients = {};
const _indexes = {};

const state = {
    apiKey: 'f54e21fa3a2a0160595bb058179bfb1e',
    appId: 'OFCNCOG2CU',
    indexId: 'npm-search',
    client: null,
    clients: {},
    indexes: {},
    searchText: '',
    searchOptions: {
        hitsPerPage: 10,
        page: 0,
        attributesToRetrieve: [
            'deprecated',
            'description',
            'githubRepo',
            'homepage',
            'keywords',
            'license',
            'name',
            'owner',
            'version',
            'repository',
        ],
    },
};

const getters = {
    index: () => () => _indexes[state.indexId],
    response: (state) => () => state.indexes[state.indexId] && state.indexes[state.indexId].response,
};

const actions = {
    firstInit({ commit, dispatch }) {
        commit('SET_CLIENT', dispatch('initClient'));
    },
    initClient({ commit }) {
        return new Promise((resolve) => {
            _clients[state.appId] = AlgoliaSearch(state.appId, state.apiKey);
            commit('INIT_CLIENT');
            resolve(state.appId);
        });
    },
    destroyClient({ commit }) {
        delete _clients[state.appId];
        commit('DESTROY_CLIENT');
    },
    initIndex({ commit }) {
        _indexes[state.indexId] = _clients[state.appId].initIndex(state.indexId);
        commit('INIT_INDEX');
    },
    destroyIndex({ commit, state }) {
        delete _indexes[state.indexId];
        commit('DESTROY_INDEX');
    },
    search({ commit, state }, text) {
        const index = _indexes[state.indexId];
        if (index) {
            commit('SET_SEARCH_TEXT', text);
            index.search(text, state.searchOptions).then((content) => {
                commit('SAVE_SEARCH_RESULT_SUCCESS', { id: state.indexId, content });
            });
        } else {
            throw new Error('Index is not init yet');
        }
    },
    changePage({ commit, dispatch, state }, page) {
        commit('SET_CURRENT_PAGE', page);
        dispatch('search', state.searchText);
    },
};

const mutations = {
    INIT_CLIENT(state) {
        state.clients = {
            ...state.clients,
            [state.appId]: { appId: state.appId, apiKey: state.apiKey, indexes: [] },
        };
    },
    DESTROY_CLIENT(state) {
        delete state.clients[state.appId];
    },
    INIT_INDEX(state) {
        state.clients[state.appId].indexes.push(state.indexId);
        state.indexes = {
            ...state.indexes,
            [state.indexId]: { response: null },
        };
    },
    DESTROY_INDEX(state) {
        const indexes = state.clients[state.appId].indexes;
        indexes.splice(indexes.indexOf(state.indexId), 1);
        delete state.indexes[state.indexId];
    },
    SAVE_SEARCH_RESULT_SUCCESS(state, { id, content }) {
        state.indexes[id].response = content;
    },
    SET_CURRENT_PAGE(state, page) {
        state.searchOptions.page = page;
    },
    SET_SEARCH_TEXT(state, text) {
        state.searchText = text;
    },
    SET_CLIENT(state, client) {
        state.client = client;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
