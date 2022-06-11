export default interface AppError {
  statusCode: number;
  status: string;
  isOperational: boolean;
  message?: string;
  stack?: any;
}
