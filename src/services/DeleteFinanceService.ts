import { Finances, User } from '@prisma/client';
import prismaClient from '../database';

interface ResponseDeletedFinanceDTO {
  message: string;
  finance?: Finances;
}

interface DeleteFinanceDTO {
  user_id: string;
  id: string;
}

class DeleteFinanceService {
  async execute({
    user_id,
    id,
  }: DeleteFinanceDTO): Promise<ResponseDeletedFinanceDTO> {
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

    const deletedFinance: Finances = await prismaClient.finances.delete({
      where: { id },
    });

    if (deletedFinance) {
      return {
        message: 'This finance deleted with success in our database',
        finance: deletedFinance,
      };
    } else {
      return {
        message: 'This finance not have deleted in our database',
      };
    }
  }
}

export default DeleteFinanceService;
