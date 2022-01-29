import { User } from "@prisma/client";
import prismaClient from "../database";

class ListUsersService {
  async execute(): Promise<Array<User>> {
    const users: Array<User> = await prismaClient.user.findMany();

    return users;
  }
}

export default ListUsersService;
