export class CrudService<T, I> {
    private data: T[] = [];
    
    constructor(initialData: T[]) {
      this.data = initialData;
    }
  
    getAll(): T[] {
      return this.data;
    }
  
    getByID(id: number): T | undefined {
      return this.data.find((item) => (item as any).id === id);
    }
  
    create(itemInput: I): T {
      const newItem = {
        id: Math.max(...this.data.map((b) => (b as any).id)) + 1,
        ...itemInput,
      } as T;
  
      this.data.push(newItem);
      return newItem;
    }
  
    update(id: number, updatedItem: I): T | null {
      const index = this.data.findIndex((item) => (item as any).id === id);
      if (index !== -1) {
        this.data[index] = { id, ...updatedItem } as T;
        return this.data[index];
      }
      return null;
    }
  
    remove(id: number): boolean {
      const index = this.data.findIndex((item) => (item as any).id === id);
      if (index !== -1) {
        this.data.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  