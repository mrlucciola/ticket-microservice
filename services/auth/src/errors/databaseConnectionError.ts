export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();

    // for extending builtin
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
