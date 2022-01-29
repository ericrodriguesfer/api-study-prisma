import { User } from '@prisma/client';
import prismaClient from '../database';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userExistsByEmail: User | null = await prismaClient.user.findUnique({
      where: { email },
    });

    if (userExistsByEmail) {
      throw new Error('This email alread exists with other user');
    }

    const user: User = await prismaClient.user.create({
      data: { name, email, password },
    });

    return user;
  }
}

export default CreateUserService;
