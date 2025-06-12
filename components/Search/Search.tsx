'use client'
import { FC, FormEvent, ReactElement, useCallback } from 'react'
import styles from './Search.module.scss'
import cn from 'classnames'
import { SearchProps } from './types'
import SearchIcon from './search.svg'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'

export const Search: FC<SearchProps> = ({
	className,
	...props
}): ReactElement => {
	const router = useRouter();

	const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get('query');

		if (typeof query !== 'string' || query.trim() === '') return;

		router.push(`/search?q=${query}`);

	}, [router]);

	return (
		<form {...props} className={cn(styles.search, className)} onSubmit={onSubmit}>
			<label className={styles.label} >
				<Input
					className={styles.input}
					placeholder='Поиск...'
					name='query'
					type='search'
				/>
			</label>
			<Button appearance='primary' className={styles.button}>
				<SearchIcon />
			</Button>
		</form>
	)
}