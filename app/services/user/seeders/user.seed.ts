import { customArray } from "@vigilio/express-core/helpers";
import { faker } from "@faker-js/faker";
import { UserSchema } from "../schemas/user.schema";
import { slug } from "~/lib/helpers";
export const userSeeder: Omit<
    UserSchema,
    "id" | "facebook" | "google" | "foto"
>[] = customArray(20).map(() => {
    const name = faker.person.fullName();
    return {
        name,
        email: faker.internet.email(),
        password: "123456",
        facebook: null,
        token: null,
        habilitado: true,
        slug: slug(name),
    };
});
