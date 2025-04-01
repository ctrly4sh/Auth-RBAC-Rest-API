import { PrismaClient, Role, User } from "@prisma/client";
import { paginationParms } from "../types/paginationParams";

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string, role = Role.USER): Promise<User> => {
    return await prisma.user.create({
        data: {email, password, role}
    });
};

export const getUsers = async ({offset, limitNumber}: paginationParms): Promise<User[]> => {
  return (await prisma.user.findMany({
    skip: offset,
    take: limitNumber
  }))
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const countUsers = async () => {
  return await prisma.user.count();
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({where : {email}})
}

export const updateUserById = async (id: string, data: Partial<User>): Promise<User | null> => {
  return await prisma.user.update({where : {id} , data});
}

export const deleteUser = async(id: string): Promise<User | null> => {
  return await prisma.user.delete({where : {id} })
}

