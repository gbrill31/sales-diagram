import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const getAll = async () => {
  const { data } = await axios.get(`${baseURL}/friends`);
  // console.log(data);
  return data;
};

export const saveNewFriend = async (friend: object) => {
  const { data } = await axios.post(`${baseURL}/friends/save`, {
    friend,
  });
  return data;
};

export const updateFriendPos = async (friend: object) => {
  const { data } = await axios.post(`${baseURL}/friends/updatepos`, { friend });
  return data;
};
