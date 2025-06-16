'use client'
import { Title } from '@/components';
import { ReactElement } from 'react';

export default function Error(): ReactElement {
	return (
		<Title as='h1' size='xl'>Ошибка 500</Title>
	)
}