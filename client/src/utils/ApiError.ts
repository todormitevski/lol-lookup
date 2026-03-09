export class ApiError extends Error {
  title: string;
  isColdStart: boolean;

  constructor(title: string, message: string, isColdStart: boolean = false) {
    super(message);
    this.title = title;
    this.isColdStart = isColdStart;
    this.name = "ApiError";
  }
}
