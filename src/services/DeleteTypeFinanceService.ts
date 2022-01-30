import { TypeFinance, User } from '@prisma/client';
import prismaClient from '../database';

interface ResponseDeletedTypeFinanceDTO {
  message: string;
  typeFinanceDeleted?: TypeFinance;
}

interface DeleteTypeFinanceDTO {
  id: string;
  user_id: string;
}

class DeleteTypeFinanceService {
  async execute({
    id,
    user_id,
  }: DeleteTypeFinanceDTO): Promise<ResponseDeletedTypeFinanceDTO> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(
        'The user contained in the login, does not exist in our database',
      );
    }

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
