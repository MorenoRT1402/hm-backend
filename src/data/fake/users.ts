import { faker } from '@faker-js/faker';
import { userParams } from '../../app/hotelParams';
import { UserStatus } from '../../interfaces/user';
import { hash } from '../../utils/hash';

export const fakeUser = () => {

  return{
    name: faker.internet.userName(),
    picture: faker.image.url(),
    position: faker.helpers.arrayElement(userParams.positions),
    email: faker.internet.email(),
    contact: faker.phone.number(),
    joined: faker.date.past(),
    jobDesk: faker.helpers.arrayElement(userParams.jobDesks),
    schedule: faker.helpers.arrayElements(userParams.schedules, 2),
    status: faker.helpers.enumValue(UserStatus),
    password: hash(faker.internet.password()),
  }
}