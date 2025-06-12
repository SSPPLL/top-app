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
			<button
				className={cn(styles.button, {
					[styles.active]: sort === SortEnum.Rating
				})}
				onClick={() => setSort(SortEnum.Rating)}
			>
				<SortIcon className={styles.icon} />
				По рейтингу
			</button>
			<button
				className={cn(styles.button, {
					[styles.active]: sort === SortEnum.Price
				})}
				onClick={() => setSort(SortEnum.Price)}
			>
				<SortIcon className={styles.icon} />
				По цене
			</button>
		</div>
	)
}