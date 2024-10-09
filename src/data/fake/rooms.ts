import { faker } from '@faker-js/faker';
import { RoomInput, RoomStatus } from "../../interfaces/room";
import random from '../../utils/random';
import { roomParams } from '../../app/hotelParams';

export const fakeRoom = ():RoomInput => {
      return {
        dateAdded: faker.date.past().toString(),
        roomType: `Deluxe ${faker.helpers.arrayElement(roomParams.letters)}`,
        number: faker.number.int(),
        picture: faker.image.url(),
        bedType: faker.helpers.arrayElement(roomParams.types),
        roomFloor: faker.helpers.arrayElement(roomParams.floors),
        facilities: faker.helpers.arrayElements(roomParams.facilities),
        rate: `$${random.number(roomParams.rates, 2)}`,
        discount: random.number(roomParams.discounts, 0),
        status: faker.helpers.enumValue(RoomStatus)
      }
}