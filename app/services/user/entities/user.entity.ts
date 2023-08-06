import {
    Column,
    DataType,
    Table,
    Model,
    BeforeCreate,
    BeforeBulkCreate,
    BeforeSave,
} from "sequelize-typescript";
import { UserSchema } from "../schemas/user.schema";
import { generateId } from "@vigilio/express-core/helpers";
import bcrypt from "bcryptjs";

@Table({ tableName: "users" })
export class UserEntity extends Model implements Omit<UserSchema, "id"> {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        unique: true,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.STRING,
    })
    foto: string;

    @Column({
        type: DataType.STRING,
    })
    token: string | null;

    @Column({
        type: DataType.STRING,
    })
    facebook: string;

    @Column({
        type: DataType.STRING,
    })
    google: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    habilitado: boolean;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    @BeforeCreate
    static hashPassword(user: UserEntity) {
        user.token = generateId();
        user.habilitado = false;
    }
    @BeforeBulkCreate
    static hashPasswordUsers(users: UserEntity[]) {
        for (const user of users) {
            user.password = bcrypt.hashSync(
                user.password,
                bcrypt.genSaltSync(10)
            );
        }
    }
}
