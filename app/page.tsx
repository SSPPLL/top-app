'use client';
import { Button, Paragraph, Tag, Title } from '@/components/ui';
import { Rating } from '@/components/ui/Rating/Rating';
import { JSX, useEffect, useState } from 'react';

export default function Home(): JSX.Element {
	const [counter, setCount] = useState(0);
	const [rating, setRating] = useState(4);

	useEffect(() => {
		console.log('Counter: ', counter);
	}, [counter]);

	useEffect(() => {
		console.log('Mounted');
		return () => {
			console.log('Unmounted');
		}
	}, []);

	useEffect(() => {
		console.log('Rating: ', rating);
	}, [rating]);

	return (
		<>
			<Title as='h1' size='xl'>{counter}</Title>
			<Button appearance='primary' arrow='right' onClick={() => setCount(counter + 1)}>Кнопка</Button>
			<Button appearance='ghost' arrow='right'>Кнопка</Button>
			<Paragraph size='lg'>Большой</Paragraph>
			<Paragraph size='md'>Средний</Paragraph>
			<Paragraph size='sm'>Маленький</Paragraph>
			<Tag as='a' href='#'>Ghost</Tag>
			<Tag size='md' color='red'>Red</Tag>
			<Tag size='md' color='grey'>Grey</Tag>
			<Tag size='sm' color='green'>Green</Tag>
			<Tag as='a' href='#' color='primary'>Primary</Tag>

			<Rating isEditable rating={rating} setRating={setRating} />
		</>
	);
}
