import { FC, ReactElement } from 'react'
import styles from './Paragraph.module.scss'
import cn from 'classnames'
import { ParagraphProps } from './types'

export const Paragraph: FC<ParagraphProps> = ({
	size = 'md',
	children,
	className,
	...props
}): ReactElement => {
	return (
		<p {...props} className={cn(styles[size], className)}>
			{children}
		</p>
	)
}