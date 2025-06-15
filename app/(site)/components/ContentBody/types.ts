import { MenuItem } from '@/interfaces/menu.interface';
import { ReactNode } from 'react';

export interface ContentBodyProps {
	menus: MenuItem[][],
	children: ReactNode
}