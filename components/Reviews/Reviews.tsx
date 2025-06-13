import { FC, ReactElement } from 'react'
import styles from './Reviews.module.scss'
import cn from 'classnames'
import { ReviewsProps } from './types'
import UserIcon from './user.svg'
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating'
import { Paragraph } from '../Paragraph/Paragraph'

export const Reviews: FC<ReviewsProps> = ({ reviews, className, ...props }): ReactElement => {
	if (reviews.length === 0) {
		return (<></>);
	}

	return (
		<ul className={cn(styles.reviews, className)} {...props}>
			{reviews.map(({ _id, name, title, description, createdAt, rating }) => (
				<li key={_id} className={styles.review}>
					<UserIcon className={styles.user} />
					<h3 className={styles.info}>
						<span className={styles.name}>{name}:  </span>
						<span className={styles.title}>{title}</span>
					</h3>
					<div className={styles.date}>
						{format(new Date(createdAt), 'd MMMM yyyy', { locale: ru })}
					</div>
					<Rating className={styles.rating} rating={rating} />
					<Paragraph className={styles.description} size='md'>{description}</Paragraph>
				</li>
			))}
		</ul>
	)
}