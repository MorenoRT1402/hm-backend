import data from '../data/bookings.json';
import { Booking, BookingInput } from '../interfaces/booking';

const bookings : Booking[] = data as Booking[];

export const getAllBookings = () => bookings;

export const getByID = (id: number) => bookings.find(b => b.id === id);

export const create = (bookingInput: BookingInput): Booking => {
    const newBooking = {
        id: Math.max(...bookings.map(b => b.id)) + 1,
        ...bookingInput
    };
    bookings.push(newBooking);
    return newBooking;
};

export const update = (id: number, bookingInput: BookingInput): Booking | null => {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index] = { id, ...bookingInput };
        return bookings[index];
    }
    return null;
};

export const remove = (id: number): boolean => {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings.splice(index, 1);
        return true;
    }
    return false;
};
