import { Model } from "mongoose";
import { UserModel } from "../db/schemas/userSchema";
import { ContactModel } from "../db/schemas/contactSchema";
import { RoomModel } from "../db/schemas/roomSchema";
import { BookingModel } from "../db/schemas/bookingSchema";

export enum tablesEnum { 
    Users = 'users',
    Contacts = 'contacts',
    Rooms = 'rooms',
    Bookings = 'bookings',
}

export interface SQLTableInterface {
    tableName: tablesEnum;
    model: Model<any>;
    headers: Array<{
        key: string;
        type: string;
        nullable?: boolean;
        unique?: boolean;
        primary?: boolean;
        foreign?: { table: string; ref: string };
        default?: string;
    }>;
}

export const tables: SQLTableInterface[] = [
    {
        tableName: tablesEnum.Users,
        model: UserModel,
        headers: [
            { key: 'name', type: 'VARCHAR(255)', nullable: false },
            { key: 'picture', type: 'VARCHAR(255)', nullable: true },
            { key: 'position', type: 'VARCHAR(100)', nullable: true },
            { key: 'email', type: 'VARCHAR(255)', nullable: false, unique: true }, 
            { key: 'contact', type: 'VARCHAR(50)', nullable: true },
            { key: 'joined', type: 'DATETIME', nullable: false },
            { key: 'jobDesk', type: 'TEXT', nullable: true },
            { key: 'schedule', type: 'TEXT', nullable: true },
            { key: 'status', type: 'VARCHAR(50)', nullable: false },
            { key: 'password', type: 'VARCHAR(255)', nullable: false },
        ]
    },
    {
        tableName: tablesEnum.Contacts,
        model: ContactModel,
        headers: [
            { key: 'date', type: 'DATETIME', nullable: false },
            { key: 'customer', type: 'VARCHAR(255)', nullable: false },
            { key: 'email', type: 'VARCHAR(255)', nullable: false },
            { key: 'phone', type: 'VARCHAR(50)', nullable: true },
            { key: 'subject', type: 'VARCHAR(255)', nullable: true },
            { key: 'comment', type: 'TEXT', nullable: true },
            { key: 'archived', type: 'BOOLEAN', nullable: false, default: '0' },
        ]
    },
    {
        tableName: tablesEnum.Rooms,
        model: RoomModel,
        headers: [
            { key: 'dateAdded', type: 'DATETIME', nullable: false },
            { key: 'roomType', type: 'VARCHAR(100)', nullable: false },
            { key: 'number', type: 'INT', nullable: false },
            { key: 'picture', type: 'VARCHAR(255)', nullable: true },
            { key: 'bedType', type: 'VARCHAR(100)', nullable: true },
            { key: 'roomFloor', type: 'VARCHAR(50)', nullable: true },
            { key: 'facilities', type: 'TEXT', nullable: true },
            { key: 'rate', type: 'DECIMAL(10, 2)', nullable: true },
            { key: 'discount', type: 'INT', nullable: true },
            { key: 'status', type: 'VARCHAR(50)', nullable: false },
        ]
    },
    {
        tableName: tablesEnum.Bookings,
        model: BookingModel,
        headers: [
            { key: 'guest', type: 'VARCHAR(255)', nullable: false },
            { key: 'picture', type: 'VARCHAR(255)', nullable: true },
            { key: 'orderDate', type: 'DATETIME', nullable: false },
            { key: 'checkIn', type: 'DATETIME', nullable: false },
            { key: 'checkOut', type: 'DATETIME', nullable: false },
            { key: 'discount', type: 'INT', nullable: true },
            { key: 'notes', type: 'TEXT', nullable: true },
            { key: 'room', type: 'INT', nullable: true, foreign: { table: tablesEnum.Rooms, ref: 'id' } },
            { key: 'status', type: 'VARCHAR(50)', nullable: false },
        ]
    }    
];