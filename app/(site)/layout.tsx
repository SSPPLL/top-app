import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/app/reset.css";
import "@/app/globals.css";
import styles from "./Layout.module.scss";
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Footer } from '@/components/Footer/Footer';
import { ReactElement } from 'react';

const notoSansKr = Noto_Sans_KR({
	variable: "--font-family",
	subsets: ["latin", "cyrillic"],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: "Наш проект",
	description: "",
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>): Promise<ReactElement> {
	return (
		<html lang="ru">
			<body className={`${notoSansKr.variable}`}>
				<div className={styles.wrapper}>
					<Header className={styles.header} />
					<Sidebar className={styles.sidebar} />
					<div className={styles.body}>
						{children}
					</div>
					<Footer className={styles.footer} />
				</div>
			</body>
		</html>
	);
}
