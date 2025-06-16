import { ReviewFormValues, ReviewSentResponse } from '@/interfaces/review.interface';
import { API } from './model';

export const sendReview = async (productId: string, formData: ReviewFormValues): Promise<ReviewSentResponse | null> => {
	const res = await fetch(API.review.createDemo, {
		method: 'POST',
		body: JSON.stringify({
			productId,
			...formData
		}),
		headers: new Headers({ 'Content-Type': 'application/json' })
	})
	if (!res.ok) {
		return null;
	}
	return res.json();
}