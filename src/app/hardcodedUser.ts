import { UserInput, UserStatus } from '../interfaces/user'
import { hash } from '../utils/hash'

export interface AppUser {
    username: string,
    password: string
}

export const hardcodedAppUser = {
    username: 'admin',
    password: '1234'
}

export const hardcodedUser : UserInput = {
    name: hardcodedAppUser.username,
    picture: 'http://dummyimage.com/123x100.png/cc0000/ffffff',
    position: 'Manager',
    email: 'hardcoded@user.com',
    contact: '691 314 8012',
    joined: '2023-10-09 12:12:19',
    jobDesk: 'Offer restaurant and activity recommendations and assist guests in arranging transportation',
    schedule: [
      'Saturday',
      'Friday'
    ],
    status: UserStatus.Active,
    password: hash(hardcodedAppUser.password)
}