import { faker } from '@faker-js/faker';
import { bookingParams } from '../../app/hotelParams';
import { BookingStatus } from '../../interfaces/booking';
import random from '../../utils/random';
import { RoomModel } from '../../db/schemas/roomSchema';
import { formatToSQLDate } from '../../utils/dates';
import { getDatabase } from '../../db/connection';

export const fakeBooking = async () => {
  // We have to generate this before
  const checkIn = faker.date.future();

  const database = getDatabase();
  const rooms = await database.getAll(RoomModel);
  if (rooms.length === 0) {
    throw new Error("No rooms available.");
  }
  const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

  return {
    guest: faker.person.fullName(),
    picture: faker.image.url(),
    orderDate: formatToSQLDate(faker.date.past()),
    checkIn: formatToSQLDate(checkIn),
    checkOut: formatToSQLDate(faker.date.future({ refDate: checkIn })),
    discount: random.number(bookingParams.discounts, 0),
    notes: faker.lorem.sentences(3).split('. ').map(note => note.trim()).filter(Boolean),
    room: database.getItemID(randomRoom),
    status: faker.helpers.enumValue(BookingStatus)
  };
};
