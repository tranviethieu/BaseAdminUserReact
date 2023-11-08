import {Fragment} from 'react';
import Head from 'next/head';
import clsx from 'clsx';

function Page({
	children,
	title,
	disabledEffect,
}: {
	children: any;
	title: string;
	disabledEffect?: boolean;
}) {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
			</Head>
			<div className={clsx({effectShow: !disabledEffect})}>
				{children}
			</div>
		</Fragment>
	);
}

export default Page;
