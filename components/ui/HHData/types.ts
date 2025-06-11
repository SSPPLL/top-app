import { HhData } from '@/interfaces/page.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type HHDataProps = HhData & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;