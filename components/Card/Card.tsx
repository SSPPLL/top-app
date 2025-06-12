import { FC, ReactElement } from 'react'
import styles from './Card.module.scss'
import cn from 'classnames'
import { CardProps } from './types'

export const Card: FC<CardProps> = ({ background = 'white', children, className, ...props }): ReactElement => {
	return (
		<div {...props} className={cn(styles.card, styles[background], className)}>
			{children}
		</div>
	)
}