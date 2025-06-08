import Link from 'next/link'
import styles from './Menu.module.scss'
import { ReactElement, useContext } from 'react'
import cn from 'classnames'
import { MenuThirdLevelProps } from './types'
import { MenuContext } from './context'

export const MenuThirdLevel = ({ pages, category, className }: MenuThirdLevelProps): ReactElement => {
	const { pathname } = useContext(MenuContext);
	return (
		<div className={cn(styles['third-level'], className)}>
			<div className={styles['third-level-wrapper']}>
				{pages.map(page => (
					<Link key={page._id} href={`/${category}/${page.alias}`} className={cn(styles['third-level-item'], {
						[styles['third-level-item-active']]: `/${category}/${page.alias}` === pathname
					})}>
						{page.category}
					</Link>
				))}
			</div>
		</div>
	)
}