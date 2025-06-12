'use client'
import { firstLevelMenu, getFirstCategoryId } from '@/helpers/helpers';
import { usePathname } from 'next/navigation';
import { FC, ReactElement, useMemo } from 'react';
import { MenuSecondLevel } from './MenuSecondLevel';
import Link from 'next/link';
import { MenuFirstLevelProps } from './types';
import styles from './Menu.module.scss'
import cn from 'classnames'
import { MenuContext } from './context';

export const MenuFirstLevel: FC<MenuFirstLevelProps> = ({
	className,
	menus,
	...props
}): ReactElement => {
	const pathname = usePathname();
	const value = useMemo(() => {
		const [, type, alias] = pathname.split('/');
		const firstCategory = getFirstCategoryId(type);

		return {
			menus,
			pathname,
			firstCategory,
			type,
			alias
		}
	}, [menus, pathname]);

	return (
		<MenuContext.Provider value={value}>
			<nav {...props} className={cn(styles.menu, className)}>
				{firstLevelMenu.map(menuItem => (
					<div key={menuItem.route}>
						<Link className={cn(styles['first-level'], {
							[styles['first-level-active']]: menuItem.id === value.firstCategory
						})} href={`/${menuItem.route}`}>
							{menuItem.icon}
							<span>{menuItem.name}</span>
						</Link>
						{menus[menuItem.id] && <MenuSecondLevel category={menuItem.route} menu={menus[menuItem.id]} />}
					</div>
				))}
			</nav>
		</MenuContext.Provider>
	)
}