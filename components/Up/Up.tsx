'use client'
import { FC, ReactElement } from 'react'
import styles from './Up.module.scss'
import ArrowIcon from './arrow.svg'
import { useScrollY } from '@/hooks/useScrollY'
import { motion } from 'motion/react';

export const Up: FC = (): ReactElement => {
	const y = useScrollY();

	return (
		<motion.button
			variants={{
				visible: {
					opacity: 1
				},
				hidden: {
					opacity: 0
				}
			}}
			initial='hidden'
			animate={y > 400 ? 'visible' : 'hidden'}
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			className={styles.up}
		>
			<ArrowIcon />
		</motion.button>
	)
}