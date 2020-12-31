
import React from 'react';
import { DraggableCore } from 'react-draggable';

import debounce from 'lodash.debounce';
import $ from 'cash-dom';

import classNames from 'classnames/bind';

import style from './ResizePanel.module.css';

console.log('ResizePanel; style ', style);

const cx = classNames.bind(style);

class ResizePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { size: 0 };

		this.contentRef = React.createRef();
		this.wrapperRef = React.createRef();
		this.validateSize = debounce(this.validateSize, 100).bind(this);
	}

  isHorizontal = () =>
  	this.props.direction === 'w' || this.props.direction === 'e';

  componentDidMount() {
  	const content = this.contentRef.current;
  	const actualContent = content.children[0];
  	const initialSize = this.isHorizontal()
  		? $(actualContent).outerWidth(true)
  		: $(actualContent).outerHeight(true);

  	// Initialize the size value based on the content's current size
  	this.setState({ size: initialSize });
  	this.validateSize();
  }

  validateSize() {
  	const isHorizontal = this.isHorizontal();
  	const content = this.contentRef.current;
  	const wrapper = this.wrapperRef.current;
  	const actualContent = content.children[0];
  	const containerParent = wrapper.parentElement;

  	//
  	// Or if our size doesn't equal the actual content size, then we
  	// must have pushed past the min size of the content, so resize back
  	// let minSize = isHorizontal ? $(actualContent).outerWidth(true) : $(actualContent).outerHeight(true);
  	let minSize = isHorizontal
  		? actualContent.scrollWidth
  		: actualContent.scrollHeight;

  	const margins = isHorizontal
  		? $(actualContent).outerWidth(true) - $(actualContent).outerWidth()
  		: $(actualContent).outerHeight(true) - $(actualContent).outerHeight();
  	minSize += margins;

  	if (this.state.size !== minSize) {
  		this.setState({
  			...this.state,
  			size: minSize
  		});
  	} else {
  		// If our resizing has left the parent container's content overflowing
  		// then we need to shrink back down to fit
  		const overflow = isHorizontal
  			? containerParent.scrollWidth - containerParent.clientWidth
  			: containerParent.scrollHeight - containerParent.clientHeight;

  		if (overflow) {
  			console.log('overflow', overflow);
  			this.setState({
  				...this.state,
  				size: isHorizontal
  					? actualContent.clientWidth - overflow
  					: actualContent.clientHeight - overflow
  			});
  		}
  	}
  }

  handleDrag = (e, ui) => {
  	const { direction } = this.props;
  	const factor = direction === 'e' || direction === 's' ? -1 : 1;

  	// modify the size based on the drag delta
  	const delta = this.isHorizontal() ? ui.deltaX : ui.deltaY;
  	this.setState((s, p) => ({ size: Math.max(10, s.size - delta * factor) }));
  };

  handleDragEnd = (e, ui) => {
  	this.validateSize();
  };

  render() {
  	const dragHandlers = {
  		onDrag: this.handleDrag,
  		onStop: this.handleDragEnd
  	};
  	const { direction } = this.props;
  	const isHorizontal = this.isHorizontal();

  	let containerClass = cx({
  		ContainerHorizontal: isHorizontal,
  		ContainerVertical: !isHorizontal
  	});

  	if (this.props.containerClass) {
  		containerClass += ` ${this.props.containerClass}`;
  	}

  	const containerStyle = { ...this.props.style } || {};
  	if (this.state.size !== 0) {
  		containerStyle.flexGrow = 0;
  		containerStyle[isHorizontal ? 'width' : 'height'] = 'auto';
  	}

  	const handleClasses =
      this.props.handleClass ||
      cx({
      	ResizeHandleHorizontal: isHorizontal,
      	ResizeHandleVertical: !isHorizontal
      });

  	const resizeBarClasses =
      this.props.borderClass ||
      cx({
      	ResizeBarHorizontal: isHorizontal,
      	ResizeBarVertical: !isHorizontal
      });

  	const contentStyle = isHorizontal
  		? { width: `${this.state.size  }px` }
  		: { height: `${this.state.size  }px` };
  	const contentClassName = cx('ResizeContent', {
  		ResizeContentHorizontal: isHorizontal,
  		ResizeContentVertical: !isHorizontal
  	});

  	const content = [
  		<div
  			key='content'
  			ref={this.contentRef}
  			className={contentClassName}
  			style={contentStyle}
  		>
  			{React.Children.only(this.props.children)}
  		</div>
  	];

  	const handle = (
  		<DraggableCore key='handle' {...dragHandlers}>
  			<div className={resizeBarClasses}>
  				<div className={handleClasses}>
  					<span />
  				</div>
  			</div>
  		</DraggableCore>
  	);

  	// Insert the handle at the beginning of the content if our directio is west or north
  	if (direction === 'w' || direction === 'n') {
  		content.unshift(handle);
  	} else {
  		content.push(handle);
  	}

  	return (
  		<div
  			ref={this.wrapperRef}
  			className={containerClass}
  			style={containerStyle}
  		>
  			{content}
  		</div>
  	);
  }
}

export default ResizePanel;
