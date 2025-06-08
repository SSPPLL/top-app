import { ReactElement } from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'
import { SidebarProps } from './types'
import { Menu } from '../Menu/Menu'
import Link from 'next/link'
import Image from 'next/image'

export const Sidebar = async ({
	className,
	...props
}: SidebarProps): Promise<ReactElement> => {
	return (
		<aside {...props} className={cn(styles.sidebar, className)}>
			<Link className={styles.logo} href="/">
				<Image src="/logo.svg" alt="" width={158} height={39} />
			</Link>
			<div>Поиск</div>
			<Menu />
		</aside>
	)
}