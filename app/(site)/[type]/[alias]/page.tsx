import { getMenu } from '@/api/menu';
import { getPage } from '@/api/page';
import { firstLevelMenu } from '@/helpers/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageParams {
	alias: string,
	type: string
}

export const generateMetadata = async ({ params }: {
	params: Promise<PageParams>
}): Promise<Metadata> => {
	const awaitedParams = await params;
	const page = await getPage(awaitedParams.alias);

	if (!page) {
		return {
			title: 'Not found'
		}
	}

	return {
		title: page.metaTitle,
		description: page.metaDescription
	}
}

export async function generateStaticParams() {
	const params: PageParams[] = [];

	for (const m of firstLevelMenu) {
		const menu = await getMenu(m.id);

		if (!menu || !menu.length) {
			continue;
		}

		menu.map(item => {
			item.pages.map(page => {
				params.push({
					alias: page.alias,
					type: m.route
				});
			})
		})
	}

	return params;
}

export default async function Page({ params }: {
	params: Promise<PageParams>
}) {
	const awaitedParams = await params;
	const page = await getPage(awaitedParams.alias);

	const firstCategoryItem = firstLevelMenu.find(item => item.route === awaitedParams.type);

	if (!page || !firstCategoryItem || firstCategoryItem.id !== page.firstCategory) {
		notFound();
	}

	return (
		<div>
			<h1>{page.title}</h1>
		</div>
	)
}