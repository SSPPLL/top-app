'use client'
import { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './Menu.module.scss'
import cn from 'classnames';
import { MenuThirdLevel } from './MenuThirdLevel';
import { MenuSecondLevelProps } from './types';
import { MenuContext } from './context';
import { motion, useReducedMotion } from 'motion/react';

export const MenuSecondLevel = ({ category, menu }: MenuSecondLevelProps): ReactElement => {
	const [openedItems, setOpenedItems] = useState<number[]>([]);
	const { type, alias, setAnnouncement } = useContext(MenuContext);
	const secondLevelActiveId = useMemo(() => {
		return menu.findIndex(m => m.pages.some(p => p.alias === alias));
	}, [menu, alias]);
	const shouldReduceMotion = useReducedMotion();

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

		const isThisActive = secondLevelActiveId === index;

		if (openedItems.includes(index) && !isThisActive) {
			setOpenedItems(prev => prev.filter(item => item !== index));
			setAnnouncement('closed');
			return;
		}

		if (!isThisActive) {
			setOpenedItems([...openedItems, index]);
		}

		setAnnouncement('opened');
	}, [menu, openedItems, secondLevelActiveId, setAnnouncement]);

	if (!menu) {
		return (<></>)
	}

	return (
		<motion.ul
			className={cn(styles['second-level-wrapper'])}
			layout={shouldReduceMotion ? false : true}
			variants={{
				visible: {
					transition: shouldReduceMotion ? {} : {
						staggerChildren: 0.03
					},
					height: 'auto'
				},
				hidden: {
					height: 0
				}
			}}
			initial={category === type ? 'visible' : 'hidden'}
			animate={category === type ? 'visible' : 'hidden'}
		>
			{menu.map((menuItem, index) => {
				return (
					<motion.li
						key={menuItem._id.secondCategory}
						className={styles['second-level-block-wrapper']}
						variants={{
							visible: {
								opacity: 1,
							},
							hidden: {
								opacity: shouldReduceMotion ? 1 : 0
							}
						}}
					>
						<button
							aria-label={'Открыть меню - ' + menuItem._id.secondCategory}
							className={styles['second-level']}
							onClick={() => openSecondLevel(index)}
							tabIndex={category === type ? 0 : -1}
							aria-expanded={openedItems.includes(index) || secondLevelActiveId === index}
						>
							{menuItem._id.secondCategory}
						</button>
						<motion.ul
							layout={shouldReduceMotion ? false : true}
							variants={{
								visible: {
									transition: shouldReduceMotion ? {} : {
										staggerChildren: 0.03
									},
									height: 'auto'
								},
								hidden: {
									height: 0
								}
							}}
							initial={secondLevelActiveId === index ? 'visible' : 'hidden'}
							animate={openedItems.includes(index) || secondLevelActiveId === index ? 'visible' : 'hidden'}
							className={cn(styles['second-level-block'])}
						>
							<MenuThirdLevel
								pages={menuItem.pages}
								category={category}
								isOpened={openedItems.includes(index) || secondLevelActiveId === index}
							/>
						</motion.ul>
					</motion.li>
				)
			})}
		</motion.ul>
	)
}