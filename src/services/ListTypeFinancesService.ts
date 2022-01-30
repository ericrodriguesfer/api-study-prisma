import { TypeFinance } from '@prisma/client';
import prismaClient from '../database';

interface ListFinancesToUserDTO {
  user_id: string;
}

class ListTypeFinancesService {
  async execute({
    user_id,
  }: ListFinancesToUserDTO): Promise<Array<TypeFinance>> {
    const typeFinances: Array<TypeFinance> =
      await prismaClient.typeFinance.findMany({ where: { userId: user_id } });

    return typeFinances;
  }
}

export default ListTypeFinancesService;
