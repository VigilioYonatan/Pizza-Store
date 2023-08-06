import { Column, DataType, Table, Model } from "sequelize-typescript";
import { ProductsEntitySchema } from "../schemas/product.schema";

@Table({ tableName: "products" })
export class ProductsEntity extends Model implements ProductsEntitySchema {
	@Column({
		allowNull: false,
		unique: true,
		type: DataType.STRING,
	})
	name: string;

	@Column({
		type: DataType.STRING,
	})
	description: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	price: number;

	@Column({
		allowNull: false,
		type: DataType.DECIMAL(10, 2),
		defaultValue:0
	})
	offer: number;

	@Column({
		allowNull: false,
		unique: true,
		type: DataType.STRING,
	})
	slug: string;
}
