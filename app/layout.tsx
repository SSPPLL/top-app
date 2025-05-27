import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
	variable: "--font-family",
	subsets: ["latin", "cyrillic"],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: "Наш проект",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={`${notoSansKr.variable}`}>
				{children}
			</body>
		</html>
	);
}
