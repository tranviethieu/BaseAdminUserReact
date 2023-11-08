import {convertCoin} from './convertCoin';

export function displayPrice(min: number | null, max: number | null) {
	if (min == null || max == null) return null;

	if (min == max) {
		return `${convertCoin(min)} đ`;
	}

	return `${convertCoin(min)} - ${convertCoin(max)} đ`;
}
