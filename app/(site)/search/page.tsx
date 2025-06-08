import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Поиск"
};

export default async function Search() {
	return (
		<div>
			<h1>Поиск</h1>
		</div>
	)
}