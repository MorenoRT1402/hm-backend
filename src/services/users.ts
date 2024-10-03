import data from '../data/users.json';
import { User, UserInput } from '../interfaces/user';
import { CrudService } from './crud';

const rooms: User[] = data as User[];

class UserService extends CrudService<User, UserInput> {
  constructor() {
    super(rooms);
  }
}

export default UserService;