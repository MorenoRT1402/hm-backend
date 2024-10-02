import data from '../data/contact.json';
import { Contact, ContactInput } from '../interfaces/contact';

const contacts : Contact[] = data as Contact[];

export const getAll = () => contacts;

export const getByID = (id: number) => contacts.find(b => b.id === id);

export const create = (userInput: ContactInput): Contact => {
    const newUser = {
        id: Math.max(...contacts.map(b => b.id)) + 1,
        ...userInput
    };
    contacts.push(newUser);
    return newUser;
};

export const update = (id: number, UserInput: ContactInput): Contact | null => {
    const index = contacts.findIndex(b => b.id === id);
    if (index !== -1) {
        contacts[index] = { id, ...UserInput };
        return contacts[index];
    }
    return null;
};

export const remove = (id: number): boolean => {
    const index = contacts.findIndex(b => b.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        return true;
    }
    return false;
};
