// src/plugins/global-error-handler.ts
import {
  FastifyInstance,
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export async function globalErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      app.log.error(error); // ✅ log error for observability

      const statusCode = error.statusCode ?? 500;

      reply.status(statusCode).send({
        success: false,
        message: error.message,
        statusCode,
        error: process.env.NODE_ENV === "production" ? undefined : error.stack, // ✅ stack only in dev
      });
    }
  );
}
