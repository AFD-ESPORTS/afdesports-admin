import * as Sentry from "@sentry/node";
import nock, { Scope } from "nock";
import axios, { AxiosResponse } from "axios";
import { ProfilingIntegration } from "@sentry/profiling-node";

const initSentry = (app: any) => {
  return Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
};

describe("API", () => {
  it("doit retourner une réponse valide avec un code 200", async () => {
    const mockingApi = nock("http://localhost:3002")
      .get("/liveness")
      .reply(200, { message: "Hello, World!" });
    initSentry(mockingApi);

    const response: AxiosResponse = await axios.get(
      "http://localhost:3002/liveness"
    );
    const data = await response.data;

    expect(data).toEqual({ message: "Hello, World!" });
  });

  it("doit retourner une erreur 500", async () => {
    const mockingApi = nock("http://localhost:3002")
      .get("/liveness")
      .reply(500, { message: "Error" });
    initSentry(mockingApi);
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3002/liveness"
      );
    } catch (error: any) {
      expect(error.response.status).toEqual(500);
    }
  });
  it("doit retourner une erreur 404", async () => {
    const mockingApi = nock("http://localhost:3002")
      .get("/liveness")
      .reply(404, { message: "Error" });
    initSentry(mockingApi);
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3002/liveness"
      );
    } catch (error: any) {
      expect(error.response.status).toEqual(404);
    }
  });
});
