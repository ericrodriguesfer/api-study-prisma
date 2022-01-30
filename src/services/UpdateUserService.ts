import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import prismaClient from '../database';

interface UpdateUserDTO {
  id: string;
  name: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  async execute({ id, name, email, password }: UpdateUserDTO): Promise<User> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('This user does not exists in our database');
    }

    if (email) {
      const userExistsByEmail: User | null = await prismaClient.user.findFirst({
        where: { email },
      });

      if (user !== userExistsByEmail && userExistsByEmail?.email === email) {
        throw new Error('This email alread exists with other user');
      }
    }

    if (password) {
      const updatedUser: User = await prismaClient.user.update({
        where: { id: user.id },
        data: { name, email, password: String(await hash(password, 8)) },
      });

      return updatedUser;
    } else {
      const updatedUser: User = await prismaClient.user.update({
        where: { id: user.id },
        data: { name, email },
      });

      return updatedUser;
    }
  }
}

export default UpdateUserService;
