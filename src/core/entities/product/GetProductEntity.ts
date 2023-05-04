import { GetCategoryEntity } from "../category/GetCategoryEntity";

export interface GetProductEntity {
	id: string;
	name: string;
	description: string;
    price: number | null;
	images: string[];
	createdAt: Date;
	phoneNumbers: string[];
	categoryIdArr: string[];
}