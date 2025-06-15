'use client'
import { FC, ReactElement, useContext } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'
import { HeaderProps } from './types'
import { Logo } from '../Logo/Logo'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { SidebarContext } from '../../context/sidebar.context'

export const Header: FC<HeaderProps> = ({ className, ...props }): ReactElement => {
	const { setIsOpen } = useContext(SidebarContext);
	return (
		<header {...props} className={cn(styles.header, className)}>
			<Logo />
			<ButtonIcon
				onClick={() => setIsOpen(true)}
				icon="hamburger"
				appearance="white"
				aria-label="Открыть мобильное меню меню"
			/>
		</header>
	)
}