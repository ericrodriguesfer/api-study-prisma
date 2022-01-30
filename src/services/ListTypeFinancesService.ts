import { TypeFinance, User } from '@prisma/client';
import prismaClient from '../database';

interface ListFinancesToUserDTO {
  user_id: string;
}

class ListTypeFinancesService {
  async execute({
    user_id,
  }: ListFinancesToUserDTO): Promise<Array<TypeFinance>> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const typeFinances: Array<TypeFinance> =
      await prismaClient.typeFinance.findMany({ where: { userId: user_id } });

    return typeFinances;
  }
}

export default ListTypeFinancesService;
