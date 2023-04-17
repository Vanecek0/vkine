import axiosFetch from "./fetch";

export const mvtvType = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    latest: 'latest',
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing: 'now_playing'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
    latest: 'latest'
}

const tmdbApi = {
    getSeasonEpisodes: (tv_id, season_number, params) => {
        const url = 'tv/' + tv_id + '/season/' + season_number;
        return axiosFetch.get(url, params);
    },
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosFetch.get(url, params);
    },
    getMovieCollection: (id, params) => {
        const url = 'collection/' + id;
        return axiosFetch.get(url, params);
    },
    getMovieCollectionImages: (id, params) => {
        const url = 'collection/' + id + '/images';
        return axiosFetch.get(url, params);
    },
    getMovieById: (id, params) => {
        const url = 'movie/' + id;
        return axiosFetch.get(url, params);
    },
    discover: (mvtv ,params) => {
        const url = `discover/${mvtv}`;
        return axiosFetch.get(url, params);
    },
    getMoviesListByGenres: (params) => {
        const url = 'discover/movie';
        return axiosFetch.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosFetch.get(url, params);
    },
    getTvListByGenres: (params) => {
        const url = 'discover/tv';
        return axiosFetch.get(url, params);
    },
    getTvById: (id, params) => {
        const url = 'tv/' + id;
        return axiosFetch.get(url, params);
    },
    getVideos: (mvtv, id, params) => {
        const url = mvtvType[mvtv] + '/' + id + '/videos';
        return axiosFetch.get(url, params);
    },
    getImages: (mvtv, id, params) => {
        const url = mvtvType[mvtv] + "/" + id + "/images";
        return axiosFetch.get(url, params);
    },
    getMultiSearch: (params) => { 
        const url = '/search/multi';
        return axiosFetch.get(url, params);
    },
    search: (mvtv, params) => {
        const url = 'search/' + mvtvType[mvtv];
        return axiosFetch.get(url, params);
    },
    searchKeywords: (params) => {
        const url = 'search/keyword';
        return axiosFetch.get(url, params)
    },
    searchPeople: (params) => { 
        const url = '/search/person';
        return axiosFetch.get(url, params);
    },
    searchCollection: (params) => { 
        const url = '/search/collection';
        return axiosFetch.get(url, params);
    },
    jobs: (params) => {
        const url = 'configuration/jobs';
        return axiosFetch.get(url, params)
    },
    detail: (mvtv, id, params) => {
        const url = mvtvType[mvtv] + '/' + id;
        return axiosFetch.get(url, params);
    },
    credits: (mvtv, id) => {
        const url = mvtvType[mvtv] + '/' + id + '/credits';
        return axiosFetch.get(url, {params: {}});
    },
    similar: (mvtv, id, params) => {
        const url = mvtvType[mvtv] + '/' + id + '/similar';
        return axiosFetch.get(url, params);
    },
    recommended: (mvtv, id, params) => {
        const url = mvtvType[mvtv] + '/' + id + '/recommendations';
        return axiosFetch.get(url, params);
    },
    getPeople: (id, params) => {
        const url = 'person/' + id;
        return axiosFetch.get(url, params);
    },
    getPeopleSocial: (id) => {
        const url = 'person/' + id + "/external_ids";
        return axiosFetch.get(url, {params: {}});
    },
    getPeopleCreditsCombined: (id, params) => {
        const url = 'person/' + id + '/combined_credits';
        return axiosFetch.get(url, params);
    },
    getGenresList: (mvtv, params) => {
        const url = 'genre/' + mvtvType[mvtv] + '/list';
        return axiosFetch.get(url, params);
    },
    getRegions: (params) => {
        const url = '/watch/providers/regions';
        return axiosFetch.get(url, params);
    },
    getLanguages: () => {
        const url = '/configuration/languages';
        return axiosFetch.get(url, {params: {}});
    }
}

export default tmdbApi;