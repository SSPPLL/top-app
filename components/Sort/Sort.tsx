'use client'
import { FC, ReactElement } from 'react'
import styles from './Sort.module.scss'
import cn from 'classnames'
import { SortEnum, SortProps } from './types'
import SortIcon from './sort.svg'

export const Sort: FC<SortProps> = ({
	sort,
	setSort,
	className,
	...props
}): ReactElement => {
	return (
		<div {...props} className={cn(styles.sort, className)}>
			<div id='sort-name' className='visually-hidden'>Сортировка</div>
			<button
				id='sort-rating'
				className={cn(styles.button, {
					[styles.active]: sort === SortEnum.Rating
				})}
				onClick={() => setSort(SortEnum.Rating)}
				aria-pressed={sort === SortEnum.Rating}
				aria-labelledby='sort-name sort-rating'
			>
				<SortIcon className={styles.icon} />
				По рейтингу
			</button>
			<button
				id='sort-price'
				className={cn(styles.button, {
					[styles.active]: sort === SortEnum.Price
				})}
				onClick={() => setSort(SortEnum.Price)}
				aria-pressed={sort === SortEnum.Price}
				aria-labelledby='sort-name sort-price'
			>
				<SortIcon className={styles.icon} />
				По цене
			</button>
		</div>
	)
}