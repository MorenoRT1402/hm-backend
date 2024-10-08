import { RoomModel } from '../db/schemas/roomSchema';
import { RoomInput } from '../interfaces/room';
import { CrudService } from './crud';

class RoomService extends CrudService<RoomInput> {
  constructor() {
    super(RoomModel);
  }
}

export default RoomService;
