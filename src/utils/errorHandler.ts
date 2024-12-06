import axios from "axios";
import { APIError, NetworkError } from "../types/errorTypes";

export function handleError(error: unknown): APIError | NetworkError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 0;

    if (status === 429) {
      return {
        status,
        message: "Too Many Requests: Please wait before retrying.",
        retryable: false,
      };
    } else if (status >= 500) {
      return {
        status,
        message: "Server error: Please try again later.",
        retryable: true,
      };
    } else if (status >= 400) {
      return {
        status,
        message: `Client error (${status}): ${error.response?.data?.error || "Request failed."}`,
        retryable: false,
      };
    }
  }

  return {
    message: "Network error or unknown issue occurred.",
    retryable: true,
  };
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: unknown) {
      const err = handleError(error);
      if (!err.retryable || i === retries - 1) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("Failed after multiple retries.");
}
