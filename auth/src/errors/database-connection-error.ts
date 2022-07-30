
export class DatabaseConnectionError extends Error {
  reason: String = 'Error connecting to database'
  constructor() {
    super()

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}