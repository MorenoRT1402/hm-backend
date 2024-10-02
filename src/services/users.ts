import data from '../data/users.json';
import { User, UserInput } from '../interfaces/user';

const users : User[] = data as User[];

export const getAll = () => users;

export const getByID = (id: number) => users.find(b => b.id === id);

export const create = (userInput: UserInput): User => {
    const newUser = {
        id: Math.max(...users.map(b => b.id)) + 1,
        ...userInput
    };
    users.push(newUser);
    return newUser;
};

export const update = (id: number, UserInput: UserInput): User | null => {
    const index = users.findIndex(b => b.id === id);
    if (index !== -1) {
        users[index] = { id, ...UserInput };
        return users[index];
    }
    return null;
};

export const remove = (id: number): boolean => {
    const index = users.findIndex(b => b.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
