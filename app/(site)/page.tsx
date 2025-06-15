import { getMenu } from '@/api/menu';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
	title: "MyTop - Наш лучший топ"
};

export async function generateStaticParams(): Promise<{ alias: string }[]> {
	const menu = await getMenu(0);

	if (!menu) {
		return [];
	}

	return menu.flatMap(item => item.pages.map(page => ({ alias: page.alias })));
}

export default async function Home(): Promise<ReactElement> {
	return (
		<></>
	)
}