import { model, Schema } from "mongoose";
import { ContactInput } from "../../interfaces/contact";

const ContactSchema = new Schema<ContactInput>({
    "date": String,
    "customer": String,
    "email": String,
    "phone": String,
    "subject": String,
    "comment": String,
    "archived": Boolean
})

export const ContactModel = model<ContactInput>('Contact', ContactSchema);