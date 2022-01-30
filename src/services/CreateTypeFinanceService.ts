import { TypeFinance, User } from '@prisma/client';
import prismaClient from '../database';

interface CreateTypeFinanceDTO {
  user_id: string;
  name: string;
}

class CreateTypeFinanceService {
  async execute({ user_id, name }: CreateTypeFinanceDTO): Promise<TypeFinance> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const existsTypeFinanceByName: TypeFinance | null =
      await prismaClient.typeFinance.findFirst({ where: { name } });

    if (existsTypeFinanceByName) {
      throw new Error('This already exists other type finance with this name');
    }

    const typeFinance: TypeFinance = await prismaClient.typeFinance.create({
      data: { name, userId: user_id },
    });

    return typeFinance;
  }
}

export default CreateTypeFinanceService;
