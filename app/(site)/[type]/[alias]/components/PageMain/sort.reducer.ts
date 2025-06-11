import { SortEnum } from '@/components/ui/Sort/types';
import { ProductModel } from '@/interfaces/product.interface';

export type SortAction = { type: SortEnum.Price } | { type: SortEnum.Rating };

export interface SortReducerState {
	sort: SortEnum
	products: ProductModel[]
}

export const sortReducer = (state: SortReducerState, action: SortAction): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) => b.initialRating - a.initialRating)
			}
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => a.price - b.price)
			}
		default:
			throw new Error('Неверный тип сортировки')
	}
}