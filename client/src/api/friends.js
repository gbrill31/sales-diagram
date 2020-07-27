import axios from 'axios';

export async function getAll() {
  const { data } = await axios.get('/friends');
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
