'use client'
import { FC, ReactElement, useContext } from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'
import { SidebarProps } from './types'
import { Search } from '../Search/Search'
import { Menu } from '../Menu/Menu'
import { Logo } from '../Logo/Logo'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { SidebarContext } from '../../context/sidebar.context'

export const Sidebar: FC<SidebarProps> = (({
	className,
	menus,
	...props
}): ReactElement => {
	const { isOpen, setIsOpen } = useContext(SidebarContext);

	return (
		<aside {...props} className={cn(styles.sidebar, className, {
			[styles.open]: isOpen
		})}>
			<div className={styles['sidebar-wrapper']}>
				<Logo className={styles.logo} />
				<ButtonIcon
					className={styles.close} icon="cross"
					onClick={() => setIsOpen(false)}
					appearance="white"
					aria-label="Закрыть мобильное меню"
				/>
				<Search className={styles.search} />
				<Menu className={styles.menu} menus={menus} />
			</div>
		</aside>
	)
})