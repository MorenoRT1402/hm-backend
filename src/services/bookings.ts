import data from '../data/bookings.json';
import { Booking, BookingInput } from '../interfaces/booking';
import { CrudService } from './crud';

const Bookings: Booking[] = data as Booking[];

class BookingService extends CrudService<Booking, BookingInput> {
  constructor() {
    super(Bookings);
  }
}

export default BookingService;