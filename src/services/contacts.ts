import { ContactModel } from '../db/schemas/contactSchema';
import { ContactInput } from '../interfaces/contact';
import { CrudService } from './crud';

class ContactService extends CrudService<ContactInput> {
  constructor() {
    super(ContactModel);
  }
}

export default ContactService;