import { model, Schema } from 'mongoose';
import { BookingInput } from '../../interfaces/booking';

const BookingSchema = new Schema<BookingInput>({
    guest: { type: String, required: true },
    picture: { type: String, required: true },
    orderDate: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    discount: { type: Number, required: true },
    notes: { type: [String], required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    status: { type: String, required: true }
});

export const BookingModel = model<BookingInput>('Booking', BookingSchema);
