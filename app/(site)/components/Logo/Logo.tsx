import { FC, ReactElement } from 'react'
import { LogoProps } from './types'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.scss'
import cn from 'classnames'

export const Logo: FC<LogoProps> = ({
	className,
	...props
}): ReactElement => {
	return (
		<Link {...props} className={cn(styles.anchor, className)} href="/" aria-label='Перейти на главную'>
			<Image src="/logo.svg" alt="" width={158} height={39} priority />
		</Link>
	)
}