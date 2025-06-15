import { createContext } from 'react';
import { MenuContextProps } from './types';

export const MenuContext = createContext<MenuContextProps>({
	menus: [],
	pathname: '',
	firstCategory: null,
	type: '',
	alias: '',
	announcement: undefined,
	setAnnouncement: () => { }
});