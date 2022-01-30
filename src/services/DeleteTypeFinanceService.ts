import { TypeFinance } from '@prisma/client';
import prismaClient from '../database';

interface ResponseDeletedTypeFinanceDTO {
  message: string;
  typeFinanceDeleted?: TypeFinance;
}

interface DeleteTypeFinanceDTO {
  id: string;
}

class DeleteTypeFinanceService {
  async execute({
    id,
  }: DeleteTypeFinanceDTO): Promise<ResponseDeletedTypeFinanceDTO> {
    const typeFinance: TypeFinance | null =
      await prismaClient.typeFinance.findFirst({
        where: { id },
      });

    if (!typeFinance) {
      throw new Error('This type finance does not exists in our database');
    }

    const deletedTypeFinance: TypeFinance =
      await prismaClient.typeFinance.delete({ where: { id } });

    if (deletedTypeFinance) {
      return {
        message: 'This type finance deleted with success in our database',
        typeFinanceDeleted: deletedTypeFinance,
      };
    } else {
      return {
        message: 'This type finance not have deleted in our database',
      };
    }
  }
}

export default DeleteTypeFinanceService;
