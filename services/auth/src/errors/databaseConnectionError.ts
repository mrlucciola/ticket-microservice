import { EventError } from ".";

export class DatabaseConnectionError extends EventError {
  reason = "Error connecting to database";

  constructor() {
    super();
  }
}
