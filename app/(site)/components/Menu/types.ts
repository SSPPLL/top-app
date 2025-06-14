import { MenuItem, PageItem } from '@/interfaces/menu.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuFirstLevelProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	menus: MenuItem[][]
}

export interface MenuSecondLevelProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	category: string,
	menu: MenuItem[]
}

export interface MenuThirdLevelProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	pages: PageItem[],
	category: string
}

export interface MenuContextProps {
	menus: MenuItem[][],
	pathname: string,
	firstCategory: number | null,
	type: string,
	alias: string
}