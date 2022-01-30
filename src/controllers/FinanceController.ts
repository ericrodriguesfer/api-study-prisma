import { Finances } from '@prisma/client';
import { Request, Response } from 'express';
import CreateFinanceService from '../services/CreateFinanceService';
import DeleteFinanceService from '../services/DeleteFinanceService';
import GetBalanceService from '../services/GetBalanceService';
import ListFinancesInService from '../services/ListFinancesInService';
import ListFinancesOutService from '../services/ListFinancesOutService';
import ListFinancesService from '../services/ListFinancesService';
import UpdateFinanceService from '../services/UpdateFinanceService';

class FinanceController {
  async list(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const finances: Array<Finances> = await new ListFinancesService().execute(
        { user_id: id },
      );

      return response.json(finances);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async listIn(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const finances: Array<Finances> =
        await new ListFinancesInService().execute({ user_id: id });

      return response.json(finances);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async listOut(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const finances: Array<Finances> =
        await new ListFinancesOutService().execute({ user_id: id });

      return response.json(finances);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async balance(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const balance = await new GetBalanceService().execute({ user_id: id });

      return response.json(balance);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const { name, type, value, type_finance_id } = request.body;

      const finance: Finances = await new CreateFinanceService().execute({
        user_id: id,
        name,
        type,
        value,
        type_finance_id,
      });

      return response.json(finance);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;
      const { name, type, value, type_finance_id } = request.body;

      const financeUpdated: Finances = await new UpdateFinanceService().execute(
        { user_id, id, name, type, value, type_finance_id },
      );

      return response.json(financeUpdated);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;

      const deletedFinance = await new DeleteFinanceService().execute({
        user_id,
        id,
      });

      return response.json(deletedFinance);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default FinanceController;
