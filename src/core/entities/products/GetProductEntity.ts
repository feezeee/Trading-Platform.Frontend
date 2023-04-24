import { GetProductResponse } from "../../data/models/products/GetProductResponse";

export interface GetProductEntity {
	id: string;
	name: string;
	description: string;
    price: number | null;
	images: string[];
}