// user.controller.ts

import { IController } from 'contracts/IController';
import { User } from '../entities/User';

export class UserController implements IController<User> {
  private users: User[] = []; // Simulando um banco de dados com um array

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  getById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updatedUserData: Partial<User>): User | undefined {
    const user = this.getById(id);
    if (!user) {
      return undefined;
    }

    Object.assign(user, updatedUserData);
    return user;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  list(): User[] {
    return this.users;
  }
}
