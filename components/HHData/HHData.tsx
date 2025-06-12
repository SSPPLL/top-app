import { FC, ReactElement } from 'react'
import styles from './HHData.module.scss'
import cn from 'classnames'
import { HHDataProps } from './types'
import { Card } from '../Card/Card'
import RateIcon from './rate.svg'
import { priceRuIntl } from '@/helpers/helpers'

export const HHData: FC<HHDataProps> = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
	className
}): ReactElement => {
	return (
		<div className={cn(styles.hh, className)}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего вакансий</div>
				<div className={styles['count-value']}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles['salary-value']}>{priceRuIntl(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles['salary-value']}>{priceRuIntl(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles['salary-value']}>{priceRuIntl(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	)
}