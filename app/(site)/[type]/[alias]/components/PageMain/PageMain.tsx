'use client'
import { Product, Sort, Tag, Title } from '@/components'
import { FC, useReducer } from 'react'
import { PageMainProps } from './types'
import { SortEnum } from '@/components/Sort/types'
import { sortReducer } from './sort.reducer'
import styles from './PageMain.module.scss'

export const PageMain: FC<PageMainProps> = ({ products, title }) => {
	const [{ sort, products: sortedProducts }, dispatchSort] = useReducer(sortReducer, {
		sort: SortEnum.Rating,
		products
	})

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort })
	}

	return (
		<>
			<div className={styles.title}>
				<Title as='h1' size='xl'>{title}</Title>
				{products && <Tag className={styles.amount} as='span' color='grey' size='md'>{products.length}</Tag>}
				<Sort className={styles.sort} sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts && sortedProducts.map(p => (
					<Product layout key={p._id} product={p} />
				))}
			</div>
		</>
	)
}