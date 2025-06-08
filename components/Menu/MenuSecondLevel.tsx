'use client'
import { Fragment, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './Menu.module.scss'
import cn from 'classnames';
import { MenuThirdLevel } from './MenuThirdLevel';
import { MenuSecondLevelProps } from './types';
import { MenuContext } from './context';

export const MenuSecondLevel = ({ category, menu }: MenuSecondLevelProps): ReactElement => {
	const [openedItems, setOpenedItems] = useState<number[]>([]);
	const { type, alias } = useContext(MenuContext);
	const secondLevelActiveId = useMemo(() => {
		return menu.findIndex(m => m.pages.some(p => p.alias === alias));
	}, [menu, alias]);

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
					<Fragment key={menuItem._id.secondCategory}>
						<div className={styles['second-level']} onClick={() => openSecondLevel(index)}>
							{menuItem._id.secondCategory}
						</div>
						<MenuThirdLevel className={cn(styles['second-level-block'], {
							[styles['second-level-block-opened']]: openedItems.includes(index) || secondLevelActiveId === index
						})} pages={menuItem.pages} category={category} />
					</Fragment>
				)
			})}
		</div>
	)
}