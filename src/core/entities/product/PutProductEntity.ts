export interface PutProductEntity {
	id: string;
	name: string;
	description: string;
    price: number | null;
	images: string[];
	phoneNumbers: string[];
	categories: string[];
}