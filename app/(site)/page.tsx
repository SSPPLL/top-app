import { getMenu } from '@/api/menu';
import { ReactElement } from 'react';

export async function generateStaticParams(): Promise<{ alias: string }[]> {
	const menu = await getMenu(0);

	if (!menu) {
		return [];
	}

	return menu.flatMap(item => item.pages.map(page => ({ alias: page.alias })));
}

export default async function Home(): Promise<ReactElement> {
	return (
		<main>

		</main>
	)
}

// export default function Home(): JSX.Element {
// 	const [counter, setCount] = useState(0);
// 	const [rating, setRating] = useState(4);

// 	useEffect(() => {
// 		console.log('Counter: ', counter);
// 	}, [counter]);

// 	useEffect(() => {
// 		console.log('Mounted');
// 		return () => {
// 			console.log('Unmounted');
// 		}
// 	}, []);

// 	useEffect(() => {
// 		console.log('Rating: ', rating);
// 	}, [rating]);

// 	return (
// 		<>
// 			<Title as='h1' size='xl'>{counter}</Title>
// 			<Button appearance='primary' arrow='right' onClick={() => setCount(counter + 1)}>Кнопка</Button>
// 			<Button appearance='ghost' arrow='right'>Кнопка</Button>
// 			<Paragraph size='lg'>Большой</Paragraph>
// 			<Paragraph size='md'>Средний</Paragraph>
// 			<Paragraph size='sm'>Маленький</Paragraph>
// 			<Tag as='a' href='#'>Ghost</Tag>
// 			<Tag size='md' color='red'>Red</Tag>
// 			<Tag size='md' color='grey'>Grey</Tag>
// 			<Tag size='sm' color='green'>Green</Tag>
// 			<Tag as='a' href='#' color='primary'>Primary</Tag>

// 			<Rating isEditable rating={rating} setRating={setRating} />
// 		</>
// 	);
// }
