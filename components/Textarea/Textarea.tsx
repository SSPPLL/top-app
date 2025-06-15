import { FC, ReactElement } from 'react'
import styles from './Textarea.module.scss'
import cn from 'classnames'
import { TextareaProps } from './types'
import { FieldError } from '../FieldError/FieldError'

export const Textarea: FC<TextareaProps> = ({
	className,
	textareaClassName,
	error,
	ref,
	...props
}): ReactElement => {
	return (

		<label className={cn(styles.label, className)}>
			<textarea {...props} className={cn(styles.textarea, textareaClassName, {
				[styles.error]: error
			})} ref={ref}></textarea>
			{error && <FieldError role='alert'>{error.message}</FieldError>}
		</label>
	)
}