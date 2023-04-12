import { Response, Request, Express } from "express"
import swaggerJsdoc from 'swagger-jsdoc';
import SwaggerUI from "swagger-ui-express"


const options: swaggerJsdoc.Options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "Rest API Docs",
            version: '1.0.0',
        },
    },
    components: {
        securitySchemas: {
            beareAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
          bearerAuth: [],
        },
      ],
      apis: ["./src/routes/*.ts", ],
}
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;