import { type Request, type Response, type NextFunction } from "express";
import { prisma } from "../../database/prisma/client";

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const admin = user.admin;

    if (admin) {
        next();
        return;
    }

    return res.status(401).json({
        error: "Unauthorized",
    });
}

export { ensureAdmin };
