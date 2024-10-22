export interface IDatabase {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    find(collection: string, query: any): Promise<any>;
    create(collection: string, data: any): Promise<any>;
    update(collection: string, query: any, data: any): Promise<any>;
    delete(collection: string, query: any): Promise<any>;
  }
  