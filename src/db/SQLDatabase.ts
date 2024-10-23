import { createPool, Pool } from "mysql2/promise";
import { IDatabase } from "./IDatabase";
import { Model } from 'mongoose';
import { GENERATION_NUMBER } from "../app/testDB";
import { hardcodedUser } from "../app/hardcodedUser";
import { fakeUser } from "../data/fake/users";
import { fakeRoom } from "../data/fake/rooms";
import { fakeContact } from "../data/fake/contacts";
import { fakeBooking } from "../data/fake/bookings";

export class SqlDatabase implements IDatabase {
    private pool: Pool;

    constructor() {
        this.pool = createPool({
            user: process.env.SQL_USER,
            host: 'localhost',
            database: process.env.DB_NAME,
            password: process.env.SQL_PASSWORD,
        });
    }

    async connect(): Promise<void> {
        console.log("SQL pool created, connection handled automatically");
    }

    async disconnect(): Promise<void> {
        await this.pool.end();
    }

    private async SelectQuery<T>(model: Model<T>, conditions?: string, values?: any[]): Promise<T[]> {
        let query = `SELECT * FROM ${model.modelName.toLowerCase()}`;
        if (conditions) query += ` WHERE ${conditions}`;
        
        const [rows] = await this.pool.query(query, values || []);
        return rows as T[];
    }

    async getAll<T>(model: Model<T>): Promise<T[]> {
        return this.SelectQuery<T>(model);
    }

    async getByID<T>(model: Model<T>, id: string): Promise<T | null> {
        const rows = await this.SelectQuery(model, 'id = ?', [id]);
        return rows[0] || null;
    }

    async getBy<T>(model: Model<T>, props: {}): Promise<T | null> {
        const keys = Object.keys(props);
        const values = Object.values(props);
        const conditions = keys.map((key) => `${key} = ?`).join(' AND ');

        const rows = await this.SelectQuery(model, conditions, values);
        return rows[0] || null;
    }

    async create<T>(model: Model<T>, itemInput: Partial<T>): Promise<T> {
        const tableName = model.modelName.toLowerCase();
        const keys = Object.keys(itemInput);
        const values = Object.values(itemInput);
        const placeholders = keys.map(() => '?').join(', ');

        const [result] = await this.pool.query(
            `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
            values
        );

        // MySQL doesn't have RETURNING, so we get the last inserted ID
        const insertedId = (result as any).insertId;
        const [rows] = await this.pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [insertedId]);
        return (rows as T[])[0];
    }

    async update<T>(model: Model<T>, id: string, updatedItem: Partial<T>): Promise<T | null> {
        const tableName = model.modelName.toLowerCase();
        const keys = Object.keys(updatedItem);
        const values = Object.values(updatedItem);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');

        await this.pool.query(
            `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
            [...values, id]
        );

        const [rows] = await this.pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        return (rows as T[])[0] || null;
    }

    async remove<T>(model: Model<T>, id: string): Promise<boolean> {
        const tableName = model.modelName.toLowerCase();
        const [result] = await this.pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }

    async dropDatabase(): Promise<void> {
        const [tables] = await this.pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE();
        `);
    
        for (const table of tables as any[]) {
            const tableName = table['table_name'];
            console.log(`Dropping table: ${tableName}`);
            await this.pool.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
        }
        console.log("All tables dropped");
    }

    async createTable(tableName: string, headers: { key: string, type: string, nullable?: boolean, unique?: boolean, primary?: boolean, foreign?: { table: string, ref: string } }[]): Promise<void> {
        const columns = headers.map(header => {
            let columnDef = `${header.key} ${header.type}`;
    
            const constraints = [
                !header.nullable ? 'NOT NULL' : '',
                header.unique ? 'UNIQUE' : '',
                header.primary ? 'PRIMARY KEY' : ''
            ].filter(Boolean).join(' ');
    
            columnDef += constraints ? ` ${constraints}` : '';
    
            if (header.foreign) {
                columnDef += `, FOREIGN KEY (${header.key}) REFERENCES ${header.foreign.table}(${header.foreign.ref})`;
            }
    
            return columnDef;
        });
    
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ${columns.join(', ')}
            );
        `;
    
        try {
            await this.pool.query(createTableQuery);
            console.log(`Table ${tableName} created successfully`);
        } catch (error) {
            console.error(`Error creating table ${tableName}:`, error);
        }
    }
    
    

    async createTables(): Promise<void> {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                picture VARCHAR(255),
                position VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                contact VARCHAR(50),
                joined DATE,
                jobDesk VARCHAR(255),
                schedule JSON,
                status VARCHAR(50),
                password VARCHAR(255) NOT NULL
            );
        `;
    
        const createRoomsTable = `
            CREATE TABLE IF NOT EXISTS rooms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                dateAdded DATE,
                roomType VARCHAR(255),
                number INT,
                picture VARCHAR(255),
                bedType VARCHAR(50),
                roomFloor INT,
                facilities JSON,
                rate DECIMAL(10, 2),
                discount DECIMAL(5, 2),
                status VARCHAR(50)
            );
        `;
    
        const createContactsTable = `
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                date DATE,
                customer VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(50),
                subject VARCHAR(255),
                comment TEXT,
                archived BOOLEAN DEFAULT FALSE
            );
        `;
    
        const createBookingsTable = `
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                guest VARCHAR(255),
                picture VARCHAR(255),
                orderDate DATE,
                checkIn DATE,
                checkOut DATE,
                discount DECIMAL(5, 2),
                notes TEXT,
                room INT,
                status VARCHAR(50),
                FOREIGN KEY (room) REFERENCES rooms(id)
            );
        `;
    
        try {
            // Ejecutar las consultas para crear las tablas
            await this.pool.query(createUsersTable);
            await this.pool.query(createRoomsTable);
            await this.pool.query(createContactsTable);
            await this.pool.query(createBookingsTable);
            console.log("Tables created successfully");
        } catch (error) {
            console.error("Error creating tables:", error);
        }
    }    

    private async saveFakeData<T>(fakeItem: () => Promise<T> | T, tableName: string, columns: string[]) {
        const valuesPlaceholder = columns.map(() => '?').join(', ');
        const fakeDatas = [];

        for (let i = 0; i < GENERATION_NUMBER; i++) {
            try {
                const itemData = await fakeItem();
                const values = columns.map(col => (itemData as any)[col]);
                fakeDatas.push(values);
            } catch (error) {
                console.error(`Error saving item to ${tableName}:`, error);
            }
        }

        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${valuesPlaceholder})`;
        await this.pool.query(query, fakeDatas);
    }

    async saveFakeDatas(): Promise<void> {
        await this.createTables();

        const adminUserQuery = `
            INSERT INTO users (name, picture, position, email, contact, joined, jobDesk, schedule, status, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await this.pool.query(adminUserQuery, [
            hardcodedUser.name, hardcodedUser.picture, hardcodedUser.position, hardcodedUser.email,
            hardcodedUser.contact, hardcodedUser.joined, hardcodedUser.jobDesk, JSON.stringify(hardcodedUser.schedule),
            hardcodedUser.status, hardcodedUser.password
        ]);

        await this.saveFakeData(fakeUser, 'users', [
            'name', 'picture', 'position', 'email', 'contact', 'joined', 'jobDesk', 'schedule', 'status', 'password'
        ]);

        await this.saveFakeData(fakeRoom, 'rooms', [
            'dateAdded', 'roomType', 'number', 'picture', 'bedType', 'roomFloor', 'facilities', 'rate', 'discount', 'status'
        ]);

        await this.saveFakeData(fakeContact, 'contacts', [
            'date', 'customer', 'email', 'phone', 'subject', 'comment', 'archived'
        ]);

        await this.saveFakeData(fakeBooking, 'bookings', [
            'guest', 'picture', 'orderDate', 'checkIn', 'checkOut', 'discount', 'notes', 'room', 'status'
        ]);
    }
    
}
