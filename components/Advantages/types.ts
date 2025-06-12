import { TopPageAdvantage } from '@/interfaces/page.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AdvantagesProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	advantages: TopPageAdvantage[]
};