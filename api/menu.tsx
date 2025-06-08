import { API } from '@/app/api'
import { MenuItem } from '@/interfaces/menu.interface'

export async function getMenu(firstCategory: number): Promise<MenuItem[] | null> {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			firstCategory
		}),
		next: {
			revalidate: 10
		}
	})

	if (!res.ok) {
		return null;
	}

	return res.json();
}