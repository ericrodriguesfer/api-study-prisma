import { Finances, User } from '@prisma/client';
import prismaClient from '../database';
import typeFinanceEnum from '../utils/typeFinanceEnum';

interface GetBalanceToUserDTO {
  user_id: string;
}

interface Balance {
  in: number;
  out: number;
  balance: number;
}

class GetBalanceService {
  async execute({ user_id }: GetBalanceToUserDTO): Promise<Balance> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

    const finances: Array<Finances> = await prismaClient.finances.findMany({
      where: { userId: user_id },
    });

    const balance: Balance = finances.reduce(
      (acomulator: Balance, finance: Finances) => {
        switch (finance.type) {
          case typeFinanceEnum.in:
            acomulator.in += Number(finance.value);
            break;

          case typeFinanceEnum.out:
            acomulator.out += Number(finance.value);
            break;
        }

        return acomulator;
      },
      { in: 0, out: 0, balance: 0 },
    );

    balance.balance = balance.in - balance.out;

    return balance;
  }
}

export default GetBalanceService;
