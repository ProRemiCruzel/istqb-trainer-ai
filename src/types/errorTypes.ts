export type APIError = {
  status: number;
  message: string;
  retryable: boolean;
};

export type NetworkError = {
  message: string;
  retryable: boolean;
};

export type CustomError = APIError | NetworkError | Error;
