import { Finances, User } from '@prisma/client';
import prismaClient from '../database';
import typeFinanceEnum from '../utils/typeFinanceEnum';

interface ListFinancesToUserDTO {
  user_id: string;
}

class ListFinancesOutService {
  async execute({ user_id }: ListFinancesToUserDTO): Promise<Array<Finances>> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const finances: Array<Finances> = await prismaClient.finances.findMany({
      where: { userId: user_id, type: typeFinanceEnum.out },
      include: {
        finance: true,
      },
    });

    return finances;
  }
}

export default ListFinancesOutService;
