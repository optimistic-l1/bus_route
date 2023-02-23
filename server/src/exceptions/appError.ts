export class AppError extends Error {
  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }
}