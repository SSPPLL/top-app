import "@/app/reset.scss";
import "@/app/globals.scss";
import styles from "./Layout.module.scss";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ReactElement } from 'react';
import { firstLevelMenu } from '@/helpers/helpers';
import { getMenu } from '@/api/menu';
import { MenuItem } from '@/interfaces/menu.interface';
import { ContentBody, YandexMetrika } from './components';
import { defaultMetadata } from './default-metadata';

const notoSansKr = Noto_Sans_KR({
	variable: "--font-family",
	subsets: ["latin", "cyrillic"],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>): Promise<ReactElement> {
	const menuArray: MenuItem[][] = [];

	for (const menu of firstLevelMenu) {
		const data = await getMenu(menu.id);
		menuArray.push(data || []);
	}

	return (
		<html lang="ru">
			<head>
				<link rel='preconnect' href='https://mc.yandex.ru' />
			</head>
			<body className={`${notoSansKr.variable}`}>
				<YandexMetrika />
				<div className={styles.wrapper}>
					<ContentBody menus={menuArray}>{children}</ContentBody>
				</div>
			</body>
		</html>
	);
}
