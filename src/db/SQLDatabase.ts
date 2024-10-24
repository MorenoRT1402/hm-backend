import { createPool, Pool } from "mysql2/promise";
import { IDatabase } from "./IDatabase";
import { Model } from 'mongoose';
import { GENERATION_NUMBER } from "../app/testDB";
import { hardcodedUser } from "../app/hardcodedUser";
import { fakeUser } from "../data/fake/users";
import { fakeRoom } from "../data/fake/rooms";
import { fakeContact } from "../data/fake/contacts";
import { fakeBooking } from "../data/fake/bookings";
import { SQLTableInterface, tables, tablesEnum } from "../app/sqlTables.data";
import { UserModel } from "./schemas/userSchema";
import { getTableName } from "../app/sqlTables.utils";

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

    //#region CRUD
    private async SelectQuery<T>(model: Model<T>, conditions?: string, values?: any[]): Promise<T[]> {
        const tableName = getTableName(model);
        let query = `SELECT * FROM ${tableName}`;
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
        const tableName = getTableName(model);
        
        const keys = Object.keys(itemInput).filter(key => key !== 'id');
        
        const values = keys.map(key => {
            const value = (itemInput as any)[key];
            return Array.isArray(value) ? JSON.stringify(value) : value;
        });
        
        const placeholders = keys.map(() => '?').join(', ');
    
        const [result] = await this.pool.query(
            `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
            values
        );
    
        const insertedId = (result as any).insertId;
        const [rows] = await this.pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [insertedId]);
        return (rows as T[])[0];
    }
    

    async update<T>(model: Model<T>, id: string, updatedItem: Partial<T>): Promise<T | null> {
        const tableName = getTableName(model);
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
        const tableName = getTableName(model);
        const [result] = await this.pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
    //#endregion

    //#region SEED
    async dropDatabase(): Promise<void> {
        const [tables] = await this.pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE();
        `);
    
        for (const table of tables as any[]) {
            const tableName = table.TABLE_NAME;
            console.log(`Dropping table: ${tableName}`);
            await this.pool.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
        }
        console.log("All tables dropped");
    }

    async createTable(table: SQLTableInterface): Promise<void> {
        const tableName = table.tableName;
        
        const columns = [
            'id INT NOT NULL UNIQUE auto_increment PRIMARY KEY',
            ...table.headers.map(header => {
                let columnDef = `${header.key} ${header.type}`;
                
                const constraints = [
                    !header.nullable ? 'NOT NULL' : '',
                    header.unique ? 'UNIQUE' : '',
                    header.default ? `DEFAULT ${header.default}` : ''
                ].filter(Boolean).join(' ');
        
                columnDef += constraints ? ` ${constraints}` : '';
        
                if (header.foreign) {
                    columnDef += `, FOREIGN KEY (${header.key}) REFERENCES ${header.foreign.table}(${header.foreign.ref})`;
                }
        
                return columnDef;
            })
        ];
        
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
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
        try {
            for (const table of tables)
                await this.createTable(table);
            console.log("Tables created successfully");
        } catch (error) {
            console.error("Error creating tables:", error);
        }
    }

    private async saveFakeData<T>(fakeItem: () => Promise<T> | T, tableEnum: tablesEnum) {
        const tableConfig = tables.find(table => table.tableName === tableEnum);
        if (!tableConfig) {
            console.error(`Table configuration not found for enum: ${tableEnum}`);
            return;
        }
    
        const model = tableConfig.model;
        let saves = 0;
    
        for (let i = 0; i < GENERATION_NUMBER; i++) {
            try {
                const itemData = await fakeItem();
                await this.create(model, itemData as Partial<T>);
                saves++;
            } catch (error) {
                console.error(`Error saving item to ${tableEnum}:`, error);
            }
        }
    
        console.log(`Saved ${saves} items to table ${tableEnum}.`);
    }
    

    async saveFakeDatas(): Promise<void> {
        await this.createTables();

        await this.create(UserModel, hardcodedUser);

        await this.saveFakeData(fakeUser, tablesEnum.Users);
        await this.saveFakeData(fakeRoom, tablesEnum.Rooms);
        await this.saveFakeData(fakeContact, tablesEnum.Contacts);
        await this.saveFakeData(fakeBooking, tablesEnum.Bookings);
    }
    //#endregion
    
    //#region AUX
    getItemID(item:any): any {return item.id};
    //#endregion
}
