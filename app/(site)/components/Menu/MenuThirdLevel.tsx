import Link from 'next/link'
import styles from './Menu.module.scss'
import { FC, ReactElement, useContext } from 'react'
import cn from 'classnames'
import { MenuThirdLevelProps } from './types'
import { MenuContext } from './context'
import { motion, useReducedMotion } from 'motion/react';

export const MenuThirdLevel: FC<MenuThirdLevelProps> = ({ pages, category, isOpened }): ReactElement => {
	const { pathname } = useContext(MenuContext);
	const shouldReduceMotion = useReducedMotion();

	return (
		<>
			{pages.map(page => {
				const url = `/${category}/${page.alias}`;
				const isActive = `/${category}/${page.alias}` === pathname;
				return (
					<motion.li
						key={page._id}
						className={styles['third-level-item']}
						variants={{
							visible: {
								opacity: 1
							},
							hidden: {
								opacity: shouldReduceMotion ? 1 : 0
							}
						}}
					>
						<Link
							tabIndex={isOpened ? 0 : -1}
							href={url}
							aria-current={isActive ? 'page' : false}
							className={cn(styles['third-level-link'], {
								[styles['third-level-link-active']]: isActive
							})}
						>
							{page.category}
						</Link>
					</motion.li>
				)
			})}
		</>
	)
}