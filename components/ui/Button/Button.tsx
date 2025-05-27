import { ElementType, ReactElement } from 'react'
import { ButtonProps, ButtonAllowedTags } from './types'
import styles from './Button.module.scss'
import cn from 'classnames'
import ArrowIcon from './arrow.svg'

export const Button = <T extends ButtonAllowedTags>({
	as,
	appearance = 'primary',
	arrow = 'none',
	children,
	className,
	...props
}: ButtonProps<T>): ReactElement => {
	const Tag = (as || 'button') as ElementType;
	return (
		<Tag {...props} className={cn(styles.defaults, styles[appearance], className)}>
			{children}
			{arrow !== 'none' &&
				<span
					className={cn(styles.arrow, styles[`arrow_${arrow}`])}>
					<ArrowIcon />
				</span>}
		</Tag>
	)
}