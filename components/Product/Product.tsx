import { FC, ReactElement } from 'react'
import styles from './Product.module.scss'
import cn from 'classnames'
import { ProductProps } from './types'

export const Product: FC<ProductProps> = ({
	product,
	className,
	...props
}): ReactElement => {
	return (
		<div {...props} className={cn(styles.product, className)}>
			{product.title}
		</div>
	)
}