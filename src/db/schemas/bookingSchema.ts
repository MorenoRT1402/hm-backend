import { model, Schema } from "mongoose";
import { BookingInput } from "../../interfaces/booking";

const BookingSchema = new Schema<BookingInput>({
    guest: String,
    picture: String,
    orderDate: String,
    checkIn: String,
    checkOut: String,
    discount: Number,
    notes: [String],
    roomId: Number,
    status: String
})

export const BookingModel = model<BookingInput>('Booking', BookingSchema);