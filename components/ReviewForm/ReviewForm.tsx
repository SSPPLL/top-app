'use client'
import { FC, ReactElement, useState } from 'react'
import styles from './ReviewForm.module.scss'
import cn from 'classnames'
import { ReviewFormProps } from './types'
import { Input } from '../Input/Input'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import { Rating } from '../Rating/Rating'
import CrossIcon from './cross.svg'
import { useForm, Controller } from 'react-hook-form'
import { ReviewFormValues, ReviewSentResponse } from '@/interfaces/review.interface'
import { sendReview } from '@/api/review'
import { motion } from 'motion/react'

export const ReviewForm: FC<ReviewFormProps> = ({
	productId,
	isOpened,
	className,
	...props
}): ReactElement => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ReviewFormValues>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const onSubmit = async (formData: ReviewFormValues) => {
		try {
			const res: ReviewSentResponse | null = await sendReview(productId, formData);

			if (!res) {
				throw new Error('Something went wrong');
			}

			reset();
			setIsSuccess(true);
		} catch (error) {
			setIsSuccess(false);
			setIsError(true);
			console.error(error);
		}
	}

	return (
		<>
			<form {...props} className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)}>
				<Input
					className={styles.name}
					{...register('name', {
						required: {
							value: true,
							message: 'Заполните имя'
						}
					})}
					type='text'
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					className={styles.title}
					{...register('title', {
						required: {
							value: true,
							message: 'Заполните заголовок'
						}
					})}
					type='text'
					placeholder='Заголовок отзыва'
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rate}>
					<span className={styles['rating-title']}>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{
							required: {
								value: true,
								message: 'Укажите рейтинг'
							}
						}}
						render={({ field }) => (
							<Rating
								error={errors.rating}
								isEditable
								className={styles.rating}
								rating={field.value}
								setRating={field.onChange}
								tabIndex={isOpened ? 0 : -1}
								aria-invalid={errors.rating ? true : false}
							/>
						)}
					>
					</Controller>
				</div>
				<Textarea
					className={styles.description}
					{...register('description', {
						required: {
							value: true,
							message: 'Заполните текст отзыва'
						}
					})}
					placeholder='Текст отзыва'
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						className={styles.button}
						type='submit'
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<div className={styles.disclaimer}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</div>
				</div>
			</form>
			<motion.div
				variants={{
					visible: {
						opacity: 1,
						height: 'auto'
					},
					hidden: {
						height: 0,
						opacity: 0,
						overflow: 'hidden'
					}
				}}
				initial='hidden'
				animate={(isSuccess || isError) ? 'visible' : 'hidden'}
			>
				<div className={cn(styles.panel, {
					[styles.error]: isError
				})} role='alert'>
					<div className={styles['panel-title']}>
						{isError ? 'Произошла ошибка' : 'Ваш отзыв отправлен'}
					</div>
					<div className={styles['panel-description']}>
						{
							isError
								? 'Что-то пошло не так, попробуйте обновить страницу'
								: 'Спасибо, ваш отзыв будет опубликован после проверки.'
						}
					</div>
					<button
						aria-label='Закрыть оповещение'
						type='button'
						className={styles.cross}
						onClick={() => isError ? setIsError(false) : setIsSuccess(false)}
					>
						<CrossIcon />
					</button>
				</div>
			</motion.div>
		</>
	)
}