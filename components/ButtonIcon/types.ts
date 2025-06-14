import { PolymorphicComponentProps } from '@/types/PolymorphicComponentProps';
import { ElementType } from 'react';
import up from './icons/up.svg';
import cross from './icons/cross.svg';
import hamburger from './icons/hamburger.svg';

export const icons = {
	up,
	cross,
	hamburger
}

export type IconName = keyof typeof icons;

export type ButtonIconAllowedTags = 'button' | 'a';

export type ButtonIconProps<T extends ElementType & ButtonIconAllowedTags> = PolymorphicComponentProps<T, {
	appearance?: 'primary' | 'white',
	icon: IconName
}>;