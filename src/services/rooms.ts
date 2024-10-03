import data from '../data/rooms.json';
import { Room, RoomInput } from '../interfaces/room';
import { CrudService } from './crud';

const rooms: Room[] = data as Room[];

class RoomService extends CrudService<Room, RoomInput> {
  constructor() {
    super(rooms);
  }
}

export default RoomService;
