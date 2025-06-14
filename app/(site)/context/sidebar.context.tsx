import { createContext } from 'react';

interface ISidebarContextProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void
}

export const SidebarContext = createContext<ISidebarContextProps>({
	isOpen: false,
	setIsOpen: () => { }
});