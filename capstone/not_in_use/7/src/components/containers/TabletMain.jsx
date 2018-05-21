import React from 'react';
import PropTypes from 'prop-types';

const TabletMain = props => (
	<div>
		<h2>{props.text}</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam massa, ornare at turpis
			quis, varius pulvinar lorem. Morbi eleifend nisi eget viverra fermentum. Vivamus interdum dui
			quis orci placerat semper. Morbi lobortis ex sit amet risus cursus pharetra. Interdum et
			malesuada fames ac ante ipsum primis in faucibus. Etiam luctus leo augue, non facilisis nunc
			aliquam sed. Aliquam erat volutpat. Nam laoreet cursus nunc, id tincidunt justo. Nullam elit
			magna, finibus at aliquam ut, blandit vel magna. Phasellus ullamcorper urna a leo luctus
			vestibulum. Duis posuere leo ac lectus auctor, convallis aliquam odio gravida.
		</p>
	</div>
);

TabletMain.propTypes = {
	text: PropTypes.string.isRequired
};

export default TabletMain;
