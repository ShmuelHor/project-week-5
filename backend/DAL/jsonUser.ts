import jsonfile from 'jsonfile';
import { User } from '../models/types';

export const writeUserToJsonFile = async (user: User) => {
  try {
    const users: User[] = await jsonfile.readFile('./data/db.json');
    users.push(user);
    await jsonfile.writeFile('./data/db.json', users);
  } catch (error) {
    console.error('Error writing user to JSON file:', error);
  }
};

export const readFromJsonFile = async()=>{

        const users: User[] = await jsonfile.readFile('./data/db.json');
        return users;
}

export const updateUser = async (user: User) => {
  try {
    const users: User[] = await jsonfile.readFile('./data/db.json');
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      await jsonfile.writeFile('./data/db.json', users);
    }
  } catch (error) {
    console.error('Error updating user in JSON file:', error);
  }
};
