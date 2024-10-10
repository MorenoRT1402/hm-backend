import request from 'supertest';
import app from '../app';
import { hardcodedAppUser } from '../app/hardcodedUser';

let cookies: string;

describe('Auth and API Tests', () => {

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send(hardcodedAppUser);

    cookies = loginRes.headers['set-cookie'];
  });

  describe('Auth Tests', () => {
    it('should return 401 if no auth', async () => {
      const res = await request(app)
        .get('/rooms');
      expect(res.statusCode).toEqual(401);
    });

    it('should return data if auth', async () => {
      const res = await request(app)
        .get('/rooms')
        .set('Cookie', cookies);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('Contacts Endpoints', () => {
    it('should create a new contact', async () => {
      const contactData = {
        date: '08-09-2024',
        customer: 'customer',
        email: 'random@customer.com',
        phone: '661',
        subject: 'Technical Support',
        comment: 'I need help with setting up my account.',
        archived: false,
      };

      const res = await request(app)
        .post('/contacts')
        .set('Cookie', cookies)
        .send(contactData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('date', contactData.date);
      expect(res.body).toHaveProperty('customer', contactData.customer);
    });

    it('should get all contacts', async () => {
      const res = await request(app)
        .get('/contacts')
        .set('Cookie', cookies);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a contact by id', async () => {
      const id = 809;
      const res = await request(app)
        .get(`/contacts/${id}`)
        .set('Cookie', cookies);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.id).toEqual(id);
    });

    it('should update a contact', async () => {
      const updatedContact = {
        date: '09-09-2024',
        customer: 'updated customer',
        email: 'updated@customer.com',
        phone: '662',
        subject: 'Technical Support Updated',
        comment: 'I need further assistance.',
        archived: false,
      };

      const res = await request(app)
        .put('/contacts/908')
        .set('Cookie', cookies)
        .send(updatedContact);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.customer).toEqual(updatedContact.customer);
      expect(res.body.email).toEqual(updatedContact.email);
    });

    it('should delete a contact', async () => {
      const id = 998;
      const uri = `/contacts/${id}`;
      const res = await request(app)
        .delete(uri)
        .set('Cookie', cookies);

      expect(res.statusCode).toEqual(204);

      const checkRes = await request(app)
        .get(uri)
        .set('Cookie', cookies);
      expect(checkRes.statusCode).toEqual(404);
    });
  });
});