export interface PostProductEntity {
	name: string;
	description: string;
	images: string[];
	phoneNumbers: string[];
    price: number | null;	
	categories: string[];
	userId: string;
}