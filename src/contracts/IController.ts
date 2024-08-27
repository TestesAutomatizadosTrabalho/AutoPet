export interface IController<T> {
    create(item: T): T;
    getById(id: number): T | undefined;
    update(id: number, updatedItem: Partial<T>): T | undefined;
    delete(id: number): boolean;
    list(): T[];
  }
  