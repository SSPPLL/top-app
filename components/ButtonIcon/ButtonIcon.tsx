import styles from './ButtonIcon.module.scss'
import { ElementType, ReactElement } from 'react'
import { ButtonIconProps, ButtonIconAllowedTags, icons } from './types'
import cn from 'classnames'

export const ButtonIcon = <T extends ButtonIconAllowedTags>({
	as,
	appearance = 'primary',
	icon,
	className,
	...props
}: ButtonIconProps<T>): ReactElement => {
	const Tag = (as || 'button') as ElementType;
	const IconComponent = icons[icon];
	return (
		<Tag {...props} className={cn(styles.defaults, styles[appearance], className)}>
			<IconComponent />
		</Tag>
	)
}