import session from "express-session";
import passport, { Profile } from "passport";
import { NextFunction, Request, Response } from "express";
import { enviroments } from "~/config/enviroments.config";
import { UserEntity } from "@/user/entities/user.entity";
import { sendEmail } from "~/lib/mailTrap";
import { slug } from "~/lib/helpers";

export const useSession = session({
    secret: enviroments.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: enviroments.NODE_ENV === "production", //true in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 7000, // 7 dia
    },
});

export function passportLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
        "local",
        (err: Error, user: { id: string; name: string }, info: string) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(202).json({
                    success: true,
                    user: { name: user.name },
                    page: "/admin",
                });
            });
        }
    )(req, res, next);
}

export async function networkLogin(
    profile: Profile,
    network: "google" | "facebook"
) {
    const { id, displayName, emails, photos } = profile;

    let user = await UserEntity.findOne({
        where: {
            [network]: id,
        },
    });

    if (!user) {
        const email = emails ? emails[0].value : null;
        const foto = photos ? photos[0].value : null;

        if (!email) {
            throw "No se encontró correo electrónico, pruebe con otra plataforma de sesión";
        }
        const [userByName, userByEmail] = await Promise.all([
            UserEntity.findOne({
                where: {
                    name: displayName,
                },
                raw: true,
            }),
            UserEntity.findOne({
                where: {
                    email,
                },
                raw: true,
            }),
        ]);
        let name = profile.displayName;
        if (userByName) {
            name = `${profile.displayName}_${Date.now().toString()}`;
        }
        if (!userByEmail) {
            user = new UserEntity({
                name,
                email,
                password: null,
                [network]: id,
                foto,
                slug: slug(name),
            });
            await user.save();
        }
    }

    if (user) {
        if (!user.habilitado) {
            sendEmail(user.name, user.email, user.token as string);
            return {
                user: null,
                message: "Enviamos un correo para que verifiques tu cuenta",
            };
        }
        return {
            user,
        };
    }
    throw "Hubo un error al registrar esta cuenta";
}
