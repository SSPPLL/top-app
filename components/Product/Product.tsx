'use client'
import cn from 'classnames'
import Image from 'next/image'
import styles from './Product.module.scss'
import { ProductProps } from './types'
import { FC, ReactElement, useRef, useState } from 'react'
import { Card } from '../Card/Card'
import { Title } from '../Title/Title'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Paragraph } from '../Paragraph/Paragraph'
import { Button } from '../Button/Button'
import { declineWordByNumber, priceRuIntl } from '@/helpers/helpers'
import { Divider } from '../Divider/Divider'
import { Reviews } from '../Reviews/Reviews'
import { ReviewForm } from '../ReviewForm/ReviewForm'

export const Product: FC<ProductProps> = ({
	product,
	className,
	...props
}): ReactElement => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	return (
		<>
			<Card {...props} className={cn(styles.product, className)}>
				<picture className={styles.logo}>
					<Image className={styles.image} src={product.image} alt={product.title} width={70} height={70} />
				</picture>
				<Title as='h2' size='md' className={styles.title}>{product.title}</Title>
				<div className={styles.price}>
					{priceRuIntl(product.price)}
					{product.oldPrice && <Tag className={styles['old-price']} color='green'>{priceRuIntl(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRuIntl(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => (
					<Tag className={styles.category} key={c} color='ghost'>{c}</Tag>
				))}</div>
				<div className={styles['price-title']}>цена</div>
				<div className={styles['credit-title']}>кредит</div>
				<div className={styles['rating-title']}>
					<a href='#ref' onClick={() => scrollToReview()}>
						{product.reviewCount} {declineWordByNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
					</a>
				</div>
				<Divider className={styles.hr}></Divider>
				<Paragraph className={styles.description} size='lg'>{product.description}</Paragraph>
				<div className={styles.features}>
					<ul className={styles.characteristics}>
						{product.characteristics.map(c => (
							<li key={c.name} className={styles['characteristics-item']}>
								<span className={styles['characteristics-name']}>{c.name}</span>
								<span className={styles['characteristics-value']}>{c.value}</span>
							</li>
						))}
					</ul>
				</div>
				<ul className={styles['adv-block']}>
					{product.advantages && <li className={styles.advantages}>
						<h3 className={styles['adv-title']}>Преимущества</h3>
						<p className={styles['adv-text']}>{product.advantages}</p>
					</li>}
					{product.disadvantages && <li className={styles.disadvantages}>
						<h3 className={styles['adv-title']}>Недостатки</h3>
						<p className={styles['adv-text']}>{product.disadvantages}</p>
					</li>}
				</ul>
				<Divider className={cn(styles.hr, styles['hr2'])}></Divider>
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles['review-button']}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card background='blue' className={cn(styles.reviews, {
				[styles.opened]: isReviewOpened,
				[styles.closed]: !isReviewOpened
			})} ref={reviewRef}>
				<Reviews reviews={product.reviews} />
				<ReviewForm productId={product._id} />
			</Card>
		</>
	)
}