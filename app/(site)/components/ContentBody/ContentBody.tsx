'use client'
import { FC, useEffect, useState, KeyboardEvent, useRef } from 'react';
import cn from "classnames";
import styles from './ContentBody.module.scss'
import { ContentBodyProps } from './types';
import { SidebarContext } from '../../context/sidebar.context';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { usePathname } from 'next/navigation';
import { Footer } from '../Footer/Footer';
import { Up } from '../Up/Up';

export const ContentBody: FC<ContentBodyProps> = ({ menus, children }) => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isSkipLinkActive, setIsSkipLinkActive] = useState<boolean>(false);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const skipContentAction = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'Space') {
			e.preventDefault();
			bodyRef.current?.focus();
		}

		setIsSkipLinkActive(false);
	}

	return (
		<>
			<a
				href="#content"
				onFocus={() => setIsSkipLinkActive(true)}
				onBlur={() => setIsSkipLinkActive(false)}
				onKeyDown={skipContentAction}
				tabIndex={1}
				className={cn(styles["skip-link"], {
					[styles["skip-link-active"]]: isSkipLinkActive
				})}
			>
				Сразу к содержанию
			</a>
			<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
				<Header className={styles.header} />
				<Sidebar
					className={styles.sidebar}
					menus={menus}
				/>
			</SidebarContext.Provider>
			<main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</>
	)
}