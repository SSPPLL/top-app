import { PolymorphicComponentProps } from '@/types/PolymorphicComponentProps';
import { ElementType, ReactNode } from 'react';

export type TitleAllowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleProps<T extends ElementType & TitleAllowedTags> = PolymorphicComponentProps<T, {
	size?: 'xl' | 'lg' | 'md',
	children: ReactNode
}>;