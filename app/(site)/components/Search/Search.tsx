'use client'
import { FC, FormEvent, ReactElement, useCallback, useRef } from 'react'
import styles from './Search.module.scss'
import cn from 'classnames'
import { SearchProps } from './types'
import SearchIcon from './search.svg'
import { useRouter } from 'next/navigation'

export const Search: FC<SearchProps> = ({
	className,
	...props
}): ReactElement => {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get('query');

		if (typeof query !== 'string' || query.trim() === '') return;

		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.blur();
		}

		router.push(`/search?q=${query}`);
	}, [router]);

	return (
		<form {...props} className={cn(styles.search, className)} onSubmit={onSubmit} role='search'>
			<label className={styles.label}>
				<input
					className={styles.input}
					placeholder='Поиск...'
					name='query'
					type='search'
					ref={inputRef}
					required
				/>
			</label>
			<button
				className={styles.button}
				aria-label='Искать по сайту'
			>
				<SearchIcon />
			</button>
		</form>
	)
}