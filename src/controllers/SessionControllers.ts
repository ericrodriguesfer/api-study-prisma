import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  async signin(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const token: string = await new CreateSessionService().execute({
        email,
        password,
      });

      return response.json(token);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default SessionController;
