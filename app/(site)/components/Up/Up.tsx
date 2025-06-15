'use client'
import { FC, ReactElement } from 'react'
import styles from './Up.module.scss'
import { useScrollY } from '@/hooks/useScrollY'
import { motion } from 'motion/react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'

const ButtonComponent = motion.create(ButtonIcon);

export const Up: FC = (): ReactElement => {
	const y = useScrollY();

	return (
		<ButtonComponent
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
			appearance='primary'
			icon='up'
			aria-label='Пролистать страницу наверх'
		/>
	)
}