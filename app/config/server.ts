import express, { NextFunction, Request, Response } from "express";
import path from "node:path";
import passport from "passport";
import flash from "connect-flash";
import cors from "cors";
import { ERROR_MIDDLEWARE, attachControllers } from "@decorators/express";
import { enviroments } from "~/config/enviroments.config";
import { connectDB } from "~/config/db.config";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { Container } from "@decorators/di";
import { logger } from "@vigilio/express-core/helpers";
import { client } from "@vigilio/express-core/client";
import { apiRouters } from "~/routers/api.router";
import { webRouters } from "~/routers/web.router";
import { authRouters } from "~/routers/auth.router";
import { global } from "~/lib/global";
import { error404 } from "~/lib/error";
import { adminRouters } from "~/routers/admin.router";
import { UserEntity } from "@/user/entities/user.entity";
import { useSession } from "@/auth/passport/loginMiddleware";
import {
    facebookStrategy,
    googleStrategy,
    localStrategy,
} from "@/auth/passport/strategies";
import { formatDate } from "~/lib/helpers";
import { profileRouters } from "~/routers/profile.router";

export class Server {
    public readonly app: express.Application = express();

    constructor() {
        this.middlewares();
        this.auth();
        this.routes();
    }

    auth() {
        // https://www.passportjs.org/concepts/authentication/sessions/
        this.app.use(cors());
        this.app.use(useSession);
        passport.use(localStrategy);
        passport.use(facebookStrategy);
        passport.use(googleStrategy);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
        passport.serializeUser((user, done) => {
            return done(null, user);
        });
        passport.deserializeUser(async (user: { id: number }, done) => {
            const usuario = await UserEntity.findByPk(user.id, {
                attributes: ["id", "name", "email", "foto", "slug"],
                raw: true,
            });
            if (!usuario) return done({ message: "error authenticated" });
            return done(null, usuario);
        });
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.path.includes("/admin") && !req.user) {
                return res.redirect("/");
            }
            if (
                req.path.includes("/auth") &&
                req.user &&
                req.path !== "/auth/logout"
            ) {
                return res.redirect("/");
            }
            res.locals.$user = req.user;

            next();
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(
            express.static(path.resolve(__dirname, "..", "..", "public"))
        );
        this.app.set("view engine", "pug");
        this.app.set(
            "views",
            path.resolve(__dirname, "..", "..", "resources", "views")
        );
        //TODO:
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            for (const [key, value] of Object.entries(global)) {
                res.locals[key] = value;
            }
            res.locals.isActive = (uri: string) => req.path === uri;
            res.locals.formatDate = formatDate;
            next();
        });

        this.app.use(client());

        connectDB();
    }

    routes() {
        const apiRouter = express.Router();
        const webRouter = express.Router();
        const authRouter = express.Router();
        const adminRouter = express.Router();
        const profileRouter = express.Router();
        attachControllers(apiRouter, apiRouters);
        attachControllers(webRouter, webRouters);
        attachControllers(authRouter, authRouters);
        attachControllers(adminRouter, adminRouters);
        attachControllers(profileRouter, profileRouters);

        Container.provide([
            { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
        ]);
        this.app.use("/", webRouter);
        this.app.use("/auth", authRouter);
        this.app.use("/admin", adminRouter);
        this.app.use("/profile", profileRouter);
        this.app.use("/api", apiRouter);

        this.app.use(error404);
    }

    listen() {
        const server = this.app.listen(enviroments.PORT, () => {
            logger.primary(`Run server in port ${enviroments.PORT}`);
        });

        return server;
    }
}
