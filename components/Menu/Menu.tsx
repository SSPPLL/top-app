import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import { MenuFirstLevel } from './MenuFirstLevel'
import { firstLevelMenu } from '@/helpers/helpers';
import { getMenu } from '@/api/menu';
import { MenuItem } from '@/interfaces/menu.interface';

export const Menu = async (
	props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
): Promise<ReactElement> => {
	const menuArray: MenuItem[][] = [];

	for (const menu of firstLevelMenu) {
		const data = await getMenu(menu.id);
		menuArray.push(data || []);
	}

	return (
		<MenuFirstLevel {...props} menus={menuArray} />
	)
}