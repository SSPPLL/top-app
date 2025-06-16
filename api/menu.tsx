import { API } from '@/api/model'
import { MenuItem } from '@/interfaces/menu.interface'

export const getMenu = async (firstCategory: number): Promise<MenuItem[] | null> => {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			firstCategory
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