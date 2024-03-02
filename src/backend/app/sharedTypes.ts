import { Query, Send } from 'express-serve-static-core';

// Typed request body
export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

// Typed request query
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

// Typed body and request body
export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U,
  query: T
}

// Types response for returning data to frontend
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}