import { ElementType, ReactElement } from 'react'
import { TagProps, TagAllowedTags } from './types'
import styles from './Tag.module.scss'
import cn from 'classnames'

export const Tag = <T extends TagAllowedTags>({
	as,
	children,
	size = 'sm',
	color = 'ghost',
	className,
	...props
}: TagProps<T>): ReactElement => {
	const Tag = (as || 'span') as ElementType;
	return (
		<Tag {...props} className={cn(
			styles.defaults,
			styles[size],
			styles[color],
			className
		)}>
			{children}
		</Tag>
	)
}