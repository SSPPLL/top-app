import { Metadata } from 'next';
import { Title } from '@/components';
import { defaultMetadata } from '../default-metadata';
import { merge } from 'lodash';

export const metadata: Metadata = merge({}, defaultMetadata, {
	title: "Поиск",
	openGraph: {
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/search`
	}
});

export default async function SearchPage({ searchParams }: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}) {
	const { q } = await searchParams;

	return (
		<>
			<Title as='h1' size='xl'>Результаты поиска по запросу: {q}</Title>
		</>
	)
}