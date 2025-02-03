import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "finder api docs",
      version
    },
    coponents: {
      securitySchems: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routes/*routes.ts", "./src/models/*.model.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  // swagger page
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // swagger json docs
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec)
  });

};

export default swaggerDocs;