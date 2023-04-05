import axios from 'axios';
import queryString from 'query-string';

const axiosFetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    paramsSerializer: {
        serialize: params => queryString.stringify({ ...params })
    }
});

axiosFetch.interceptors.request.use(async (request) => {
    return request
});
axiosFetch.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    localStorage.clear();
    return Promise.reject(error);
});

export default axiosFetch;