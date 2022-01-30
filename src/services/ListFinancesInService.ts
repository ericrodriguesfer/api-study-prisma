import { Finances } from '@prisma/client';
import prismaClient from '../database';
import typeFinanceEnum from '../utils/typeFinanceEnum';

interface ListFinancesToUserDTO {
  user_id: string;
}

class ListFinancesInService {
  async execute({ user_id }: ListFinancesToUserDTO): Promise<Array<Finances>> {
    const finances: Array<Finances> = await prismaClient.finances.findMany({
      where: { userId: user_id, type: typeFinanceEnum.in },
      include: {
        finance: true,
      },
    });

    return finances;
  }
}

export default ListFinancesInService;
