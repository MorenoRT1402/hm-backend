import { BookingModel } from '../db/schemas/bookingSchema';
import { BookingInput } from '../interfaces/booking';
import { CrudService } from './crud';

class BookingService extends CrudService<BookingInput> {
  populateFields = ['room']
  constructor() {
    super(BookingModel);
  }

  async getAll(): Promise<BookingInput[]> {
    return super.getAll(this.populateFields);
  }

  async getByID(id: string): Promise<BookingInput | null> {
    return super.getByID(id, this.populateFields); 
  }
}

export default BookingService;