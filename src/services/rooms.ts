import data from '../data/rooms.json';
import { Room, RoomInput } from '../interfaces/room';

const rooms : Room[] = data as Room[];

export const getAll = () => rooms;

export const getByID = (id: number) => rooms.find(b => b.id === id);

export const create = (roomInput: RoomInput): Room => {
    const newRoom = {
        id: Math.max(...rooms.map(b => b.id)) + 1,
        ...roomInput
    };
    rooms.push(newRoom);
    return newRoom;
};

export const update = (id: number, roomInput: RoomInput): Room | null => {
    const index = rooms.findIndex(b => b.id === id);
    if (index !== -1) {
        rooms[index] = { id, ...roomInput };
        return rooms[index];
    }
    return null;
};

export const remove = (id: number): boolean => {
    const index = rooms.findIndex(b => b.id === id);
    if (index !== -1) {
        rooms.splice(index, 1);
        return true;
    }
    return false;
};
