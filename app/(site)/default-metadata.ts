import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
	title: "MyTop - Наш лучший топ",
	openGraph: {
		title: "MyTop - Наш лучший топ",
		url: process.env.NEXT_PUBLIC_DOMAIN,
		locale: 'ru_RU'
	}
};