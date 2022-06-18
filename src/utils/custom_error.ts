import { errorMessage } from "../types";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError"
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorMessage(value: any): value is errorMessage {
  // NOTE: プロパティがアクセスできない可能性を排除
  if (value == null) return false;

  return (
    typeof value.message == "string" &&
    typeof value.forDeveloperMessage == "string"
  );
}
