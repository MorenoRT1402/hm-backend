import { faker } from '@faker-js/faker';
import { RoomStatus } from "../../interfaces/room";
import random from '../../utils/random';
import { roomParams } from '../../app/hotelParams';
import { formatToSQLDate } from '../../utils/dates';

export const fakeRoom = () => {
  return {
  dateAdded: formatToSQLDate(faker.date.past()),
  roomType: `Deluxe ${faker.helpers.arrayElement(roomParams.letters)}`,
  number: random.number(roomParams.numbers, 0),
  picture: faker.image.url(),
  bedType: faker.helpers.arrayElement(roomParams.types),
  roomFloor: faker.helpers.arrayElement(roomParams.floors),
  facilities: faker.helpers.arrayElements(roomParams.facilities),
  rate: random.number(roomParams.rates, 2),
  discount: random.number(roomParams.discounts, 0),
  status: faker.helpers.enumValue(RoomStatus)
  }
}