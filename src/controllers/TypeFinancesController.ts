import { TypeFinance } from '@prisma/client';
import { Request, Response } from 'express';
import CreateTypeFinanceService from '../services/CreateTypeFinanceService';
import DeleteTypeFinanceService from '../services/DeleteTypeFinanceService';
import ListTypeFinancesService from '../services/ListTypeFinancesService';
import capitalize from '../utils/capitalize';

class TypeFinancesController {
  async list(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const typeFinances: Array<TypeFinance> =
        await new ListTypeFinancesService().execute({ user_id: id });

      return response.json(typeFinances);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const { name } = request.body;

      const typeFinance: TypeFinance =
        await new CreateTypeFinanceService().execute({
          user_id: id,
          name: capitalize(name),
        });

      return response.json(typeFinance);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;

      const deletedTypeFinance = await new DeleteTypeFinanceService().execute({
        id,
        user_id,
      });

      return response.json(deletedTypeFinance);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default TypeFinancesController;
