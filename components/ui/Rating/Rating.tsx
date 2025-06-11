'use client'
import { ReactElement, useState, KeyboardEvent, useEffect, FC } from 'react'
import { RatingProps } from './types'
import styles from './Rating.module.scss'
import cn from 'classnames'
import StarIcon from './star.svg'

export const Rating: FC<RatingProps> = ({
	isEditable = false,
	rating,
	setRating,
	className,
	...props
}): ReactElement => {
	const [currentRating, setCurrentRating] = useState<number>(rating);

	useEffect(() => {
		setCurrentRating(rating);
	}, [rating]);

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return
		}

		setCurrentRating(i)
	}

	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return
		}

		setRating(i)
	}

	const onKeyDown = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}

		return (e: KeyboardEvent<SVGElement>) => {
			if (e.code !== 'Space') {
				return;
			}

			setRating(i);
		}
	}

	return (
		<div {...props} className={cn(styles.defaults, className)}>
			{Array(5).fill(0).map((_, i: number) => (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
					key={i}>
					<StarIcon tabIndex={isEditable ? 0 : -1} onKeyDown={onKeyDown(i + 1)} />
				</span>
			))}
		</div>
	)
}