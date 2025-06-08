import { ReactElement } from 'react'
import styles from './Footer.module.scss'
import cn from 'classnames'
import { FooterProps } from './types'
import { format } from 'date-fns'
import Link from 'next/link'

export const Footer = ({
	className,
	...props
}: FooterProps): ReactElement => {
	return (
		<footer {...props} className={cn(styles.footer, className)}>
			<div>
				OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<Link href="#" target='_blank '>Пользовательское соглашение</Link>
			<Link href="#" target='_blank '>Политика конфиденциальности</Link>
		</footer>
	)
}