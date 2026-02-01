import axios from "axios";

// Advanced search function
export const fetchUserData = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url);
  return response.data; // returns { total_count, items: [] }
};
