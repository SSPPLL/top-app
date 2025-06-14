import Link from 'next/link'
import styles from './Menu.module.scss'
import { FC, ReactElement, useContext } from 'react'
import cn from 'classnames'
import { MenuThirdLevelProps } from './types'
import { MenuContext } from './context'
import { motion } from 'motion/react';

export const MenuThirdLevel: FC<MenuThirdLevelProps> = ({ pages, category }): ReactElement => {
	const { pathname } = useContext(MenuContext);
	return (
		<>
			{pages.map(page => (
				<motion.div
					key={page._id}
					className={styles['third-level-item']}
					variants={{
						visible: {
							opacity: 1
						},
						hidden: {
							opacity: 0
						}
					}}
				>
					<Link href={`/${category}/${page.alias}`} className={cn(styles['third-level-link'], {
						[styles['third-level-link-active']]: `/${category}/${page.alias}` === pathname
					})}>
						{page.category}
					</Link>
				</motion.div>
			))}
		</>
	)
}