// src/api/searchService.js
import http from './http';

const search = async (q) => {
  const res = await http.get(`/api/search?q=${encodeURIComponent(q)}`);
  return res.data; // { users: [], messages: [] }
};

export default { search };
