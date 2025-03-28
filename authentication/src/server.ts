import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path'

import userRoutes from './user/user.routes';

const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true
})

const app = express();
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Authentication Microservice is running!");
});

const PORT = process.env.PORT || 8000;

const swaggerDocumentPath = path.join(__dirname, 'docs/auth-api.yaml'); 
console.log('Full path:', swaggerDocumentPath);
console.log('File exists:', require('fs').existsSync(swaggerDocumentPath));
const swaggerDocument = YAML.load(swaggerDocumentPath);

app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Auth Service API Docs",
    customCss: '.swagger-ui .topbar { display: none }'
  })
);

app.listen(PORT, () => {
  console.log(`🚀 Authentication Microservice has started on port ${PORT}`);
});
