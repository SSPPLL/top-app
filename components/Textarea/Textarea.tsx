import { FC, ReactElement } from 'react'
import styles from './Textarea.module.scss'
import cn from 'classnames'
import { TextareaProps } from './types'

export const Textarea: FC<TextareaProps> = ({
	className,
	...props
}): ReactElement => {
	return (
		<textarea {...props} className={cn(styles.textarea, className)}></textarea>
	)
}