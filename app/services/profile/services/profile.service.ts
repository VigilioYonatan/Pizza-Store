import { Injectable } from "@decorators/di";
import { UserEntity } from "@/user/entities/user.entity";

@Injectable()
export class ProfileService {
    async index() {}
    async show(slug: string) {
        let user = await UserEntity.findOne({ where: { slug } });
        if (!user) {
            user = await UserEntity.findByPk(slug);
        }
        return { user };
    }
}
