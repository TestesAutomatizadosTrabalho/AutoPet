export interface IRepository<T> {
    getById(id: number): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    update(id: number, entity: T): Promise<boolean>;
}