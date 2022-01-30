import { Finances, TypeFinance, User } from '@prisma/client';
import prismaClient from '../database';
import typeFinanceEnum from '../utils/typeFinanceEnum';

interface CreateFinanceDTO {
  user_id: string;
  name: string;
  type_finance_id: string;
  type: string;
  value: number;
}

class CreateFinanceService {
  async execute({
    user_id,
    name,
    type_finance_id,
    type,
    value,
  }: CreateFinanceDTO): Promise<Finances> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const existsFinanceByName: Finances | null =
      await prismaClient.finances.findFirst({ where: { name } });

    if (existsFinanceByName) {
      throw new Error('This name alredy exists in usage with other finance');
    }

    const typeFinance: TypeFinance | null =
      await prismaClient.typeFinance.findFirst({
        where: { id: type_finance_id },
      });

    if (!typeFinance) {
      throw new Error(
        'This type finance repassed with finance does not exists in our database',
      );
    }

    if (!['in', 'out'].includes(type)) {
      throw new Error(
        'This type repassed with finance not combine with in our out',
      );
    }

    const finance: Finances = await prismaClient.finances.create({
      data: {
        name,
        financeId: typeFinance.id,
        userId: user_id,
        type: type === 'in' ? typeFinanceEnum.in : typeFinanceEnum.out,
        value: value,
      },
    });

    return finance;
  }
}

export default CreateFinanceService;
