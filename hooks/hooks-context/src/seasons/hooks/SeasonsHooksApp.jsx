import React, { useState, useEffect } from 'react';

import SeasonDisplay from '../SeasonDisplay';
import Spinner from '../Spinner';
import useLocation from '../../hooks/useLocation';

const SeasonHooksApp = () => {
	const [lat, errorMessage] = useLocation();

	let content;
	if (errorMessage) {
		content = <div>Error: {errorMessage}</div>;
	} else if (lat) {
		content = <SeasonDisplay lat={lat} />;
	} else {
		content = <Spinner message="Please accept location request" />;
	}

	return <div className="border red">{content}</div>;
};

export default SeasonHooksApp;
