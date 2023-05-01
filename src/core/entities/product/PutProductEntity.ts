import { GetCategoryEntity } from "../category/GetCategoryEntity";

export interface PutProductEntity {
	id: string;
	name: string;
	description: string;
    price: number;
	images: string[];
	phoneNumbers: string[];
	categories: string[];
}