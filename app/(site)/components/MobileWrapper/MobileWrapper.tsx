'use client'
import { FC, useEffect, useState } from 'react';
import styles from './MobileWrapper.module.scss'
import { MobileWrapperProps } from './types';
import { SidebarContext } from '../../context/sidebar.context';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { usePathname } from 'next/navigation';

export const MobileWrapper: FC<MobileWrapperProps> = ({ menus }) => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			<Header className={styles.header} />
			<Sidebar
				className={styles.sidebar}
				menus={menus}
			/>
		</SidebarContext.Provider>
	)
}