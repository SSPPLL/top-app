'use client'
import { firstLevelMenu, getFirstCategoryId } from '@/helpers/helpers';
import { usePathname } from 'next/navigation';
import { FC, ReactElement, useMemo, useState } from 'react';
import { MenuSecondLevel } from './MenuSecondLevel';
import Link from 'next/link';
import { MenuFirstLevelProps } from './types';
import styles from './Menu.module.scss'
import cn from 'classnames'
import { MenuContext } from './context';
export const Menu: FC<MenuFirstLevelProps> = ({
	className,
	menus,
	...props
}): ReactElement => {
	const [announcement, setAnnouncement] = useState<'closed' | 'opened' | undefined>();
	const pathname = usePathname();
	const value = useMemo(() => {
		const [, type, alias] = pathname.split('/');
		const firstCategory = getFirstCategoryId(type);

		return {
			menus,
			pathname,
			firstCategory,
			type,
			alias,
			announcement,
			setAnnouncement
		}
	}, [announcement, menus, pathname]);

	return (
		<MenuContext.Provider value={value}>
			<nav {...props} className={cn(styles.menu, className)} role='navigation'>
				{announcement && <span className='visually-hidden' role='log'>
					{announcement === 'opened' ? 'Развернуто' : 'Свернуто'}
				</span>}
				<ul>
					{firstLevelMenu.map(menuItem => (
						<li
							className={styles['first-level-wrapper']}
							key={menuItem.route}
						>
							<Link
								aria-expanded={menuItem.id === value.firstCategory}
								aria-current={value.type === menuItem.route && !value.alias ? 'page' : false}
								className={cn(styles['first-level'], {
									[styles['first-level-active']]: menuItem.id === value.firstCategory
								})}
								href={`/${menuItem.route}`}
							>
								{menuItem.icon}
								<span>{menuItem.name}</span>
							</Link>
							{menus[menuItem.id] && <MenuSecondLevel category={menuItem.route} menu={menus[menuItem.id]} />}
						</li>
					))}
				</ul>
			</nav>
		</MenuContext.Provider>
	)
}