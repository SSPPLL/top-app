import { FC, ReactElement } from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'
import { SidebarProps } from './types'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from '../Search/Search'
import { Menu } from '../Menu/Menu'

export const Sidebar: FC<SidebarProps> = async ({
	className,
	...props
}): Promise<ReactElement> => {
	return (
		<aside {...props} className={cn(styles.sidebar, className)}>
			<Link className={styles.logo} href="/">
				<Image src="/logo.svg" alt="" width={158} height={39} />
			</Link>
			<Search className={styles.search} />
			<Menu />
		</aside>
	)
}