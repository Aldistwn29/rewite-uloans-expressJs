import prisma from '../lib/prisma.js';

export class UserRepository {
  static async createUser(userData) {
    return prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  static updateName(userId, newName) {
    return prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });
  }
}
