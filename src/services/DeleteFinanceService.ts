import { Finances } from '@prisma/client';
import prismaClient from '../database';

interface ResponseDeletedFinanceDTO {
  message: string;
  finance?: Finances;
}

interface DeleteFinanceDTO {
  id: string;
}

class DeleteFinanceService {
  async execute({ id }: DeleteFinanceDTO): Promise<ResponseDeletedFinanceDTO> {
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
