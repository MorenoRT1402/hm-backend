import { BookingModel } from '../db/schemas/bookingSchema';
import { BookingInput } from '../interfaces/booking';
import { CrudService } from './crud';

class BookingService extends CrudService<BookingInput> {
  constructor() {
    super(BookingModel);
  }
}

export default BookingService;