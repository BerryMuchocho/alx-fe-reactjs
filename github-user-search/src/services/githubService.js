import axios from "axios";

// This adds the advanced user search function 
export const fetchAdvancedUsers = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url);
  return response.data; // see if this returns { total_count, items: [] }
};

