import { Finances, TypeFinance, User } from '@prisma/client';
import prismaClient from '../database';
import typeFinanceEnum from '../utils/typeFinanceEnum';

interface UpdateFinanceDTO {
  user_id: string;
  id: string;
  name?: string;
  type_finance_id?: string;
  type?: string;
  value?: number;
}

class UpdateFinanceService {
  async execute({
    user_id,
    id,
    name,
    type,
    type_finance_id,
    value,
  }: UpdateFinanceDTO): Promise<Finances> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const finance: Finances | null = await prismaClient.finances.findFirst({
      where: { id },
    });

    if (!finance) {
      throw new Error('This finance does not exists in our database');
    }

    if (name) {
      const financeExistsByName: Finances | null =
        await prismaClient.finances.findFirst({ where: { name } });

      if (financeExistsByName) {
        throw new Error(
          'This name repassed with this finance already in usage with other finances',
        );
      }
    }

    if (type) {
      if (!['in', 'out'].includes(type)) {
        throw new Error(
          'This type repassed with finance not combine with in our out',
        );
      }
    }

    if (type_finance_id) {
      const typeFinance: TypeFinance | null =
        await prismaClient.typeFinance.findFirst({
          where: { id: type_finance_id },
        });

      if (!typeFinance) {
        throw new Error(
          'This type finance repassed with finance does not exists in our database',
        );
      }
    }

    const updatedFinance: Finances = await prismaClient.finances.update({
      where: { id: finance.id },
      data: {
        name,
        type: type === 'in' ? typeFinanceEnum.in : typeFinanceEnum.out,
        financeId: type_finance_id,
        value,
      },
    });

    return updatedFinance;
  }
}

export default UpdateFinanceService;
