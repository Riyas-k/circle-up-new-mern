import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import CORS from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";

const expressConfig = (app: Application) => {
  const corsOptions = {
    origin: "*",
    exposedHeaders: [
      "Cross-Origin-Opener-Policy: same-origin",
      "Cross-Origin-Embedder-Policy: require-corp",
      "Cross-Origin-Resource-Policy : same-site",
    ],
  };

  //express middlewares
  app.use(CORS(corsOptions));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
};
export default expressConfig;
