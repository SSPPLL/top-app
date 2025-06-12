import { PolymorphicComponentProps } from '@/types/PolymorphicComponentProps';
import { ElementType, ReactNode } from 'react';

export type TagAllowedTags = 'a' | 'span';

export type TagProps<T extends ElementType & TagAllowedTags> = PolymorphicComponentProps<T, {
	size?: 'md' | 'sm',
	color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary',
	children: ReactNode
}>;