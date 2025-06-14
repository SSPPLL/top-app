import { FC, ReactElement } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'
import { HeaderProps } from './types'

export const Header: FC<HeaderProps> = ({ className, ...props }): ReactElement => {
	return (
		<header {...props} className={cn(styles.header, className)}>
			kklswdkql
		</header>
	)
}