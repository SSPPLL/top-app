import { ReactElement } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'
import { HeaderProps } from './types'

export const Header = ({
	className,
	...props
}: HeaderProps): ReactElement => {
	return (
		<header {...props} className={cn(styles.header, className)}>

		</header>
	)
}