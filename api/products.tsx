import { API } from '@/api/model'
import { ProductModel } from '@/interfaces/product.interface';

export async function getProducts(category: string, limit: number = 10): Promise<ProductModel[] | null> {
	const res = await fetch(API.product.find, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			category,
			limit
		}),
		next: {
			revalidate: 60
		}
	})
	if (!res.ok) {
		return null;
	}
	return res.json();
}