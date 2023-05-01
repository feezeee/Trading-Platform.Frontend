import { GetProductEntity } from "../../entities/product/GetProductEntity";
import { GetProductResponse } from "../../data/models/product/GetProductResponse";

export const toGetProductEntity = (
  apiResponse: GetProductResponse
): GetProductEntity => {
  const product: GetProductEntity = {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    price: apiResponse.price,
    images: apiResponse.image_urls,
    createdAt: "12.12.2023",
    phoneNumbers: ["+375 29 830-63-61", "+375 44 763-61-02"],
    categories: [ {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    },
    {
      id: "123",
      name: "Категория 1"
    },
    {
      id: "1234",
      name: "Категория 2"
    }]
  };
  return product;
};
