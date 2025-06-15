import { firstLevelMenu } from '@/helpers/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactElement } from 'react';

interface PageParams {
	type: string
}

export const generateMetadata = async ({ params }: {
	params: Promise<PageParams>
}): Promise<Metadata> => {
	const awaitedParams = await params;

	if (!awaitedParams.type) {
		return {
			title: 'Not found'
		}
	}

	const firstCategoryItem = firstLevelMenu.find(item => item.route === awaitedParams.type);

	if (!firstCategoryItem) {
		return {
			title: 'Not found'
		}
	}

	return {
		title: firstCategoryItem.name
	}
}

export async function generateStaticParams(): Promise<PageParams[]> {
	const params: PageParams[] = [];

	for (const m of firstLevelMenu) {
		params.push({
			type: m.route
		})
	}

	return params;
}

export default async function FirstCategoryPage({ params }: {
	params: Promise<{ type: string }>
}): Promise<ReactElement> {
	const awaitedParams = await params;
	const firstCategoryItem = firstLevelMenu.find(item => item.route === awaitedParams.type);

	if (!firstCategoryItem) {
		notFound();
	}
	return (
		<>
			<h1>{awaitedParams.type}</h1>
		</>
	)
}