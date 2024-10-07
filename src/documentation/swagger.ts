import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { BookingSchema } from './schemas/booking.schema';
import { ContactSchema } from './schemas/contact.schema';
import { RoomSchema } from './schemas/room.schema';
import { UserSchema } from './schemas/user.schema';
import { BookingInputSchema } from './schemas/booking.input.schema';
import { ContactInputSchema } from './schemas/contact.input.schema';
import { RoomInputSchema } from './schemas/room.input.schema';
import { UserInputSchema } from './schemas/user.input.schema';

// Configuration for Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Miranda Hotel API',
      version: '1.0.0',
      description: 'API documentation for the Miranda hotel backend.',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://hotelmiranda.com' : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server',
      },
    ],
    components: {
      schemas: {
        Booking: BookingSchema,
        BookingInput: BookingInputSchema,
        Contact: ContactSchema,
        ContactInput: ContactInputSchema,
        Room: RoomSchema,
        RoomInput: RoomInputSchema,
        User: UserSchema,
        UserInput: UserInputSchema,
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

// Swagger initialization
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware to serve Swagger UI
export const swaggerSetup = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
