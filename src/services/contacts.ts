import data from '../data/contact.json';
import { Contact, ContactInput } from '../interfaces/contact';
import { CrudService } from './crud';

const Contacts: Contact[] = data as Contact[];

class ContactService extends CrudService<Contact, ContactInput> {
  constructor() {
    super(Contacts);
  }
}

export default ContactService;