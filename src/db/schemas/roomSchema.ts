import { model, Schema } from "mongoose";
import { RoomInput } from "../../interfaces/room";

const RoomSchema = new Schema<RoomInput>({
    dateAdded: String,
    roomType: String,
    number: Number,
    picture: String,
    bedType: String,
    roomFloor: String,
    facilities: [String],
    rate: String,
    discount: Number,
    status: String
})

export const RoomModel = model<RoomInput>('Room', RoomSchema);