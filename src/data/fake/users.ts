import { faker } from '@faker-js/faker';
import { userParams } from '../../app/hotelParams';
import { UserInput, UserStatus } from '../../interfaces/user';
import { hash } from '../../utils/hash';
import { formatToSQLDate } from '../../utils/dates';

export const fakeUser = () :UserInput => {

  return{
    name: faker.internet.userName(),
    picture: faker.image.url(),
    position: faker.helpers.arrayElement(userParams.positions),
    email: faker.internet.email(),
    contact: faker.phone.number(),
    joined: formatToSQLDate(faker.date.past()),
    jobDesk: faker.helpers.arrayElement(userParams.jobDesks),
    schedule: faker.helpers.arrayElements(userParams.schedules, 2),
    status: faker.helpers.enumValue(UserStatus),
    password: hash(faker.internet.password()),
  }
}