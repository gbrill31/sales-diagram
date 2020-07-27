import axios from 'axios';

console.log(process.env.NODE_ENV);
const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export async function getAll() {
  const { data } = await axios.get(`${baseURL}/friends`);
  return data;
}

export async function saveNewFriend(friend) {
  const { data } = await axios.post('/friends/savenew', { friend });
  return data;
}

export async function exportToCsv() {
  const { data } = await axios.get('/friends/export');
  return data;
}
