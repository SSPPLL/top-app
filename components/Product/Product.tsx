'use client'
import cn from 'classnames'
import Image from 'next/image'
import styles from './Product.module.scss'
import { ProductProps } from './types'
import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react'
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
import { motion, useAnimation } from 'motion/react';

export const Product = motion.create(({
	product,
	className,
	...props
}: ProductProps): ReactElement => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);
	const controls = useAnimation();

	const scrollToReview = async () => {
		await controls.start('visible');

		setIsReviewOpened(true);

		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});

		reviewRef.current?.focus();
	}

	const onReviewsCountClick = (event: MouseEvent) => {
		event.preventDefault();
		scrollToReview();
	}

	useEffect(() => {
		controls.start(isReviewOpened ? 'visible' : 'hidden');
	}, [controls, isReviewOpened]);

	return (
		<Card {...props} className={cn(styles.product, className)}>
			<picture className={styles.logo}>
				<Image className={styles.image} src={product.image} alt={product.title} width={70} height={70} />
			</picture>
			<Title as='h2' size='md' className={styles.title}>{product.title}</Title>
			<div className={styles.price}>
				<span><span className='visually-hidden'>цена</span> {priceRuIntl(product.price)}</span>
				{product.oldPrice && <Tag className={styles['old-price']} color='green'>
					<span className='visually-hidden'>скидка</span>
					{priceRuIntl(product.price - product.oldPrice)}
				</Tag>}
			</div>
			<div className={styles.credit}>
				<span className='visually-hidden'>кредит</span>
				{priceRuIntl(product.credit)}/<span className={styles.month}>мес</span>
			</div>
			<div className={styles.rating}>
				<span className='visually-hidden'>{'рейтинг ' + (Math.round(product.reviewAvg ?? product.initialRating))}</span>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>{product.categories.map(c => (
				<Tag className={styles.category} key={c} color='ghost'>{c}</Tag>
			))}</div>
			<div className={styles['price-title']} aria-hidden={true}>цена</div>
			<div className={styles['credit-title']} aria-hidden={true}>кредит</div>
			<div className={styles['rating-title']}>
				<a href='#' onClick={onReviewsCountClick}>
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
					aria-expanded={isReviewOpened}
				>
					Читать отзывы
				</Button>
			</div>
			<motion.div
				className={styles['reviews-wrapper']}
				animate={controls}
				variants={{
					visible: {
						height: 'auto'
					},
					hidden: {
						height: 0
					}
				}}
				initial='hidden'
			>
				<Card background='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
					<Reviews reviews={product.reviews} />
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</Card>
	)
})