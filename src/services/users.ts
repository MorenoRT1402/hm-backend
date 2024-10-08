import { UserModel } from '../db/schemas/userSchema';
import { UserInput } from '../interfaces/user';
import { CrudService } from './crud';

class UserService extends CrudService<UserInput> {
  constructor() {
    super(UserModel);
  }
}

export default UserService;