export class ApiError extends Error {
  title: string;

  constructor(title: string, message: string) {
    super(message);
    this.title = title;
    this.name = "ApiError";
  }
}
