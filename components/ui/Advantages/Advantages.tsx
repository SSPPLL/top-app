import { FC, ReactElement } from 'react'
import styles from './Advantages.module.scss'
import cn from 'classnames'
import { AdvantagesProps } from './types'
import CheckIcon from './check.svg'
import { Paragraph } from '../Paragraph/Paragraph'
import { Title } from '../Title/Title'

export const Advantages: FC<AdvantagesProps> = ({
	advantages,
	className,
	...props
}): ReactElement => {
	if (advantages.length === 1 && advantages[0].title.length === 0 && advantages[0].description.length === 0) {
		return (<></>);
	}

	return (
		<div className={cn(styles.wrapper, className)}>
			<Title as='h2' size='lg' className={styles.title}>Преимущества</Title>
			<ul {...props} className={styles.advantages}>
				{advantages.map(advantage => {
					if (advantage.title.length === 0 && advantage.description.length === 0) {
						return (<></>);
					}

					return (
						<li key={advantage._id} className={styles.advantage}>
							<CheckIcon />
							<Title as='h3' size='md' className={styles.subtitle}>{advantage.title}</Title>
							{advantage.description.length > 0 && <hr className={styles.line} />}
							<Paragraph size='lg'>{advantage.description}</Paragraph>
						</li>
					)
				})}
			</ul>
		</div>
	)
}