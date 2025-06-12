import { PolymorphicComponentProps } from '@/types/PolymorphicComponentProps';
import { ElementType, ReactNode } from 'react';

export type ButtonAllowedTags = 'button' | 'a';

export type ButtonProps<T extends ElementType & ButtonAllowedTags> = PolymorphicComponentProps<T, {
	appearance?: 'primary' | 'ghost',
	children: ReactNode,
	arrow?: 'right' | 'down' | 'none'
}>;