import {useState, useEffect} from 'react';

function useWindowWidth() {
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowWidth;
}

export default useWindowWidth;
