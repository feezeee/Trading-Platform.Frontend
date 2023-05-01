export interface GetProductResponse {
	id: string;
	name: string;
	description: string;
	image_urls: string[];
	phone_numbers: string[];
    price: number | null;
	category_id_list: string[];
	created_at: string;
}