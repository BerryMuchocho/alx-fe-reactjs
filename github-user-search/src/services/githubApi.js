import axios from 'axios';

const githubApi = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_GITHUB_API_KEY
      ? `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`
      : undefined,
  },
});

export default githubApi;
