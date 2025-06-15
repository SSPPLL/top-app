'use client'
import { ReactElement, useState, KeyboardEvent, useEffect, FC, useRef } from 'react'
import { RatingProps } from './types'
import styles from './Rating.module.scss'
import cn from 'classnames'
import StarIcon from './star.svg'
import { FieldError } from '../FieldError/FieldError'

export const Rating: FC<RatingProps> = ({
	error,
	isEditable = false,
	rating,
	setRating,
	className,
	tabIndex,
	...props
}): ReactElement => {
	const [currentRating, setCurrentRating] = useState<number>(typeof rating !== 'undefined' ? Math.round(rating) : 0);
	const starsRef = useRef<(SVGElement | null)[]>([]);

	useEffect(() => {
		setCurrentRating(typeof rating !== 'undefined' ? Math.round(rating) : 0);
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

	const onKeyDown = (e: KeyboardEvent<SVGElement>) => {
		if (!isEditable || !setRating) {
			return;
		}

		if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
			e.preventDefault();

			if (!currentRating) {
				setRating(1);
			} else if (currentRating < 5) {
				setRating(currentRating + 1);
			}

			console.log(starsRef.current[currentRating]);

			starsRef.current[currentRating]?.focus();
		}

		if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
			e.preventDefault();

			if (currentRating > 1) {
				setRating(currentRating - 1);

				starsRef.current[currentRating - 2]?.focus();
			}
		}
	}

	const computeFocus = (current: number, index: number): number => {
		if (!isEditable || !setRating) {
			return -1;
		}

		if (!currentRating && index === 0) {
			return tabIndex ?? 0;
		}

		if (currentRating === index + 1) {
			return tabIndex ?? 0;
		}

		return -1
	}

	return (
		<div {...props} className={cn(styles.defaults, className)}>
			<div className={cn({
				[styles.error]: error
			})}>
				{Array(5).fill(0).map((_, i: number) => (
					<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
						key={i}
					>
						<StarIcon
							tabIndex={computeFocus(currentRating, i)}
							onKeyDown={onKeyDown}
							ref={r => {
								starsRef.current?.push(r)
							}}
							role={isEditable ? 'slider' : undefined}
							aria-valuenow={isEditable ? (currentRating ?? 0) : undefined}
							aria-valuemax={isEditable ? 5 : undefined}
							aria-valuemin={isEditable ? 1 : undefined}
							aria-label={isEditable ? (currentRating ? `Рейтинг ${i + 1} из 5` : 'Установите рейтинг клавишами вверх или вниз') : undefined}
						/>
					</span>
				))}
			</div>
			{error && <FieldError role='alert'>{error.message}</FieldError>}
		</div>
	)
}