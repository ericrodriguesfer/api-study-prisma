import { Finances } from '@prisma/client';
import prismaClient from '../database';

interface ListFinancesToUserDTO {
  user_id: string;
}

class ListFinancesService {
  async execute({ user_id }: ListFinancesToUserDTO): Promise<Array<Finances>> {
    const finances: Array<Finances> = await prismaClient.finances.findMany({
      where: { userId: user_id },
      include: {
        finance: true,
      },
    });

    return finances;
  }
}

export default ListFinancesService;
