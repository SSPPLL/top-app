import { ElementType, ReactElement } from 'react'
import { TitleProps, TitleAllowedTags } from './types'
import styles from './Title.module.scss'
import cn from 'classnames'

export const Title = <T extends TitleAllowedTags>({
	as,
	children,
	size = 'lg',
	className,
	...props
}: TitleProps<T>): ReactElement => {
	const Tag = (as || 'h2') as ElementType;
	return (
		<Tag {...props} className={cn(styles.defaults, styles[size], className)}>
			{children}
		</Tag>
	)
}