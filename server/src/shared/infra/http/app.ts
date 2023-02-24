import "reflect-metadata";
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./routes";

import "../../container";
import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());

app.use(
    cors({
        exposedHeaders: ["X-Total-Count"],
    })
);
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",

        message: `Internal server error - ${err.message}`,
    });
});

export { app };
