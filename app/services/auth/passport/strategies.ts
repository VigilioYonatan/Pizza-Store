import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserEntity } from "@/user/entities/user.entity";
import bcrypt from "bcryptjs";
import { sendEmail } from "~/lib/mailTrap";
import { networkLogin } from "./loginMiddleware";

export const localStrategy = new LocalStrategy(
	{ usernameField: "email" },
	async (email: string, password: string, done: Function) => {
		const user = await UserEntity.findOne({
			where: {
				email: email,
			},
			raw: true,
		});
		if (!user) {
			return done(null, false, {
				success: false,
				message: "correo electrónico o contraseña incorrecta",
			});
		}
		if (!user.password) {
			return done(null, false, {
				success: false,
				message:
					"Esta cuenta no tiene contraseña. Realiza una contraseña en la configuración de tu perfil",
			});
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return done(null, false, {
				success: false,
				message: "correo electrónico o contraseña incorrecta",
			});
		}
		if (!user.habilitado) {
			return done(null, false, {
				success: false,
				verificado: false,
				message: "Esta cuenta no está verificado",
			});
		}
		return done(null, user);
	},
);

export const facebookStrategy = new FacebookStrategy(
	{
		clientID: "807517710700277",
		clientSecret: "750deee8261d2f92316ffe351cb80a67",
		callbackURL: "/auth/facebook/callback",
		profileFields: ["id", "displayName", "photos", "email"],
	},
	async (_accessToken, _refreshToken, profile, done) => {
		try {
			const user = await networkLogin(profile, "facebook");
			if (!user.user) {
				return done(null, false, { message: user.message });
			}
			return done(null, user.user);
		} catch (error) {
			done(null, false, { message: error });
		}
	},
);

export const googleStrategy = new GoogleStrategy(
	{
		clientID:
			"406605173196-0ipr7ci4e9sme8vq4ghgc1161p6m4o3a.apps.googleusercontent.com",
		clientSecret: "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",
		callbackURL: "/auth/google/callback",
		scope: ["profile", "email"],
	},
	async function (_accessToken, _refreshToken, profile, done) {
		try {
			const user = await networkLogin(profile, "google");
			if (!user.user) {
				return done(null, false, { message: user.message });
			}

			return done(null, user.user);
		} catch (error) {
			done(null, false, { message: error });
		}
	},
);
