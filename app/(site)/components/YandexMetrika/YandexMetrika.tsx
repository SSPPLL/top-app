"use client";
import { usePathname } from "next/navigation";
import { FC, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const YM_COUNTER_ID = 12345678;

export const YandexMetrika: FC = () => {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname) {
			ym("hit", pathname);
		}
	}, [pathname]);

	return (
		<YMInitializer
			accounts={[YM_COUNTER_ID]}
			options={{
				defer: true,
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
			}}
			version="2"
		/>
	);
};