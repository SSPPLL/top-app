import { FC, ReactElement } from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'
import { InputProps } from './types'

export const Input: FC<InputProps> = ({
	className,
	...props
}): ReactElement => {
	return (
		<input {...props} className={cn(styles.input, className)} />
	)
}