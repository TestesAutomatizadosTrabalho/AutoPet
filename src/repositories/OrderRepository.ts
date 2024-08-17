import { PrismaClient, Order } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository {
  async createOrder(data: { totalAmount: number; productIds: number[] }) {
    return await prisma.order.create({
      data: {
        totalAmount: data.totalAmount,
        products: {
          connect: data.productIds.map(id => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });
  }
}