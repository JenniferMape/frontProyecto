// import { tesloApi } from '@/api/tesloApi';
// import type { Offer } from '../interfaces/product.interface';
// import { getProductImageAction } from './get-product-image.action';

// export const getProductsAction = async (page: number = 1, limit: number = 10) => {
//   try {
//     const { data } = await tesloApi.get<Offer[]>(`/products?limit=${limit}&offset=${page * limit}`);

//     return data.map((product) => ({
//       ...product,
//       images: product.images_offer.map(getProductImageAction),
//     }));
//   } catch (error) {
//     console.log(error);
//     throw new Error('Error getting products');
//   }
// };
