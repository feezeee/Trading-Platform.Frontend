export interface GetProductResponse {
	id: string;
	name: string;
	description: string;
    price: number | null;
	image_urls: string[];
}