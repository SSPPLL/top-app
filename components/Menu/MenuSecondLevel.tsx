'use client'
import { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './Menu.module.scss'
import cn from 'classnames';
import { MenuThirdLevel } from './MenuThirdLevel';
import { MenuSecondLevelProps } from './types';
import { MenuContext } from './context';
import { motion } from 'motion/react';

export const MenuSecondLevel = ({ category, menu }: MenuSecondLevelProps): ReactElement => {
	const [openedItems, setOpenedItems] = useState<number[]>([]);
	const { type, alias } = useContext(MenuContext);
	const secondLevelActiveId = useMemo(() => {
		return menu.findIndex(m => m.pages.some(p => p.alias === alias));
	}, [menu, alias]);
	const variants = {
		visible: {
			transition: {
				staggerChildren: 0.03
			},
			height: 'auto'
		},
		hidden: {
			height: 0
		}
	}

	useEffect(() => {
		if (!alias || secondLevelActiveId === -1) {
			setOpenedItems([]);
			return;
		}

		setOpenedItems([secondLevelActiveId]);
	}, [secondLevelActiveId, alias]);

	const openSecondLevel = useCallback((index: number) => {
		if (!menu) {
			return;
		}

		setOpenedItems(prev => {
			if (prev && prev.includes(index)) {
				return prev.filter(item => item !== index);
			}

			return [...(prev || []), index];
		});
	}, [menu]);

	if (!menu) {
		return (<></>)
	}

	return (
		<div className={cn(styles['second-level-wrapper'], {
			[styles['second-level-wrapper-opened']]: category === type
		})}>
			{menu.map((menuItem, index) => {
				return (
					<div key={menuItem._id.secondCategory} className={styles['second-level-block-wrapper']}>
						<button
							aria-label='Открыть меню'
							className={styles['second-level']}
							onClick={() => openSecondLevel(index)}
						>
							{menuItem._id.secondCategory}
						</button>
						<motion.div
							layout
							variants={variants}
							initial={secondLevelActiveId === index ? 'visible' : 'hidden'}
							animate={openedItems.includes(index) || secondLevelActiveId === index ? 'visible' : 'hidden'}
							className={cn(styles['second-level-block'])}
						>
							<MenuThirdLevel pages={menuItem.pages} category={category} />
						</motion.div>
					</div>
				)
			})}
		</div>
	)
}