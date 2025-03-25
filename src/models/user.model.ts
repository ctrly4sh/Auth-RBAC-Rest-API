import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string, role = Role.USER): Promise<User> => {
    return await prisma.user.create({
        data: {email, password, role}
    });
};

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};


