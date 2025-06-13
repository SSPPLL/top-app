import { ReviewModel } from '@/interfaces/product.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewsProps extends DetailedHTMLProps<
	HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
> {
	reviews: ReviewModel[]
};