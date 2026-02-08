import { hc } from "hono/client";
import type { RouteType } from "../../server/hono/route";

type Fetch = typeof fetch;

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(`HttpError: ${status} ${statusText}`);
  }
}

const customFetch: Fetch = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    console.error(response);
    // Try to get the error body for debugging
    try {
      const errorBody = await response.clone().json();
      console.error("Error response body:", errorBody);
    } catch {
      // If we can't parse as JSON, try as text
      try {
        const errorText = await response.clone().text();
        console.error("Error response text:", errorText);
      } catch {
        // Ignore if we can't read the response
      }
    }
    throw new HttpError(response.status, response.statusText);
  }
  return response;
};

export const honoClient = hc<RouteType>("/", {
  fetch: customFetch,
});
