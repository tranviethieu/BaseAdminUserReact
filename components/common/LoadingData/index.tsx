import * as loading from '../../../public/static/anim/loading_data.json';

import {Fragment} from 'react';
import style from './LoadingData.module.scss';

function LoadingData({
	isLoading,
	load,
	children,
	noti,
	data,
}: {
	isLoading?: boolean;
	children: any;
	load?: any;
	noti?: any;
	data?: any;
}) {
	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Fragment>
			{isLoading ? (
				load ? (
					load
				) : (
					<div className={style.container}>
						<div className={style.ldsSpinner}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)
			) : !!noti ? (
				data ? (
					<Fragment>{children}</Fragment>
				) : (
					noti
				)
			) : (
				<Fragment>{children}</Fragment>
			)}
		</Fragment>
	);
}

export default LoadingData;
