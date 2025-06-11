import { getMenu } from '@/api/menu';
import { getPage } from '@/api/page';
import { getProducts } from '@/api/products';
import { Advantages, HHData, Tag, Title } from '@/components/ui';
import { firstLevelMenu } from '@/helpers/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './Page.module.scss';
import { ReactElement } from 'react';
import { TopLevelCategory } from '@/interfaces/page.interface';
import parse from 'html-react-parser';
import { PageMain } from './components';

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

export async function generateStaticParams(): Promise<PageParams[]> {
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
}): Promise<ReactElement> {
	const awaitedParams = await params;
	const page = await getPage(awaitedParams.alias);

	const firstCategoryItem = firstLevelMenu.find(item => item.route === awaitedParams.type);

	if (!page || !firstCategoryItem || firstCategoryItem.id !== page.firstCategory) {
		notFound();
	}

	const products = await getProducts(page.category, 10);

	return (
		<>
			<PageMain products={products || []} title={page.title} />
			<div className={styles['hh-title']}>
				<Title as='h2' size='lg'>Вакансии - {page.category}</Title>
				<Tag as='span' color='red' size='sm'>hh.ru</Tag>
			</div>
			{page.firstCategory === TopLevelCategory.Courses && page.hh && <HHData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && <Advantages advantages={page.advantages} />}
			{/* {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />} */}
			{page.seoText && <div className={styles.seo}>{parse(page.seoText)}</div>}
			<Title as='h2' size='lg' className={styles['subtitle']}>Получаемые навыки</Title>
			{page.tags && page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
		</>
	)
}