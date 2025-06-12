import { FirstLevelMenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/page.interface';
import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books
	},
	{
		route: 'products',
		name: 'Товары',
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products
	}
]

export const getFirstCategoryId = (route: string): number | null => {
	const firstCategory = firstLevelMenu.find(item => item.route === route);

	return firstCategory ? firstCategory.id : null
}

export const priceRuIntl = (price: number): string =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
	}).format(price);

export function declineWordByNumber(number: number, words: [string, string, string]) {
	number = Math.abs(number) % 100;
	const lastDigit = number % 10;

	if (number > 10 && number < 20) {
		return words[2];
	}
	if (lastDigit > 1 && lastDigit < 5) {
		return words[1];
	}
	if (lastDigit === 1) {
		return words[0];
	}
	return words[2];
}
