export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface AWSError extends Error {
  name: string;
  $metadata: { httpStatusCode: number };
}
