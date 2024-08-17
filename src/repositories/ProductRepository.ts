import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(data: { name: string; price: number; stock: number; categoryId: number }) {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      },
    });
  }
}