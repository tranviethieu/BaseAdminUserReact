import {Fragment, useMemo} from 'react';

import {PropsSkeletonLoading} from './interface';

function SkeletonLoading({count, Item}: PropsSkeletonLoading) {
	const listItem: any[] = useMemo(() => {
		const list: any[] = [];
		for (let index = 0; index < count; index++) {
			list.push(Item);
		}
		return list;
	}, [Item, count]);

	return (
		<Fragment>
			{listItem.map((v, i) => {
				return <Item key={i} />;
			})}
		</Fragment>
	);
}

export default SkeletonLoading;
