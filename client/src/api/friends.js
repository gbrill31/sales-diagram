import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export async function getAll() {
  const { data } = await axios.get(`${baseURL}/friends`);
  // console.log(data);
  return data;
}

export async function saveNewFriend(friend) {
  const { data } = await axios.post(`${baseURL}/friends/save`, { friend });
  return data;
}

export async function updateFriendPos(friend) {
  const { data } = await axios.post(`${baseURL}/friends/updatepos`, { friend });
  return data;
}
