import pino from 'pino';
import { injectable } from "tsyringe";

@injectable()
export class Logger {
  private readonly pino: pino.Logger;

  constructor() {
    this.pino = pino();
  }

  log(message: string) {
    this.pino.info(message);
  }
}