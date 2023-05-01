import { GetCategoryEntity } from "../category/GetCategoryEntity";

export interface PostProductEntity {
	name: string;
	description: string;
    price: number;
	images: string[];
	phoneNumbers: string[];
	categories: string[];
}