export interface Contact {
    "id": number,
    "date": string,
    "customer": string,
    "email": string,
    "phone": string,
    "subject": string,
    "comment": string,
    "archived": boolean
}

export type ContactInput = Omit<Contact, 'id'>;