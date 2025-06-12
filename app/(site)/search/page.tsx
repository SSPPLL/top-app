import { Metadata } from 'next';
import { Title } from '@/components';

export const metadata: Metadata = {
	title: "Поиск"
};

export default async function SearchPage({ searchParams }: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}) {
	const { q } = await searchParams;

	return (
		<div>
			<Title as='h1' size='xl'>Результаты поиска по запросу: {q}</Title>
		</div>
	)
}