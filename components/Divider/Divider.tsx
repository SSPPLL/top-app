import { FC, ReactElement } from 'react'
import styles from './Divider.module.scss'
import cn from 'classnames'
import { DividerProps } from './types'

export const Divider: FC<DividerProps> = ({ className, ...props }): ReactElement => {
	return (
		<hr className={cn(styles.hr, className)} {...props} />
	)
}