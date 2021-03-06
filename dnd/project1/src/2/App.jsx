
import React from 'react';
// import ResizePanel from "react-resize-panel";

import styled from 'styled-components';

import classNames from 'classnames/bind';

import ResizePanel from './components/ResizePanel';

import style from './App.module.css';

import styleScss from './scss.module.scss';

import './abc.css';
import './def.scss';

export const Intro = styled.p`
	background-color: purple;
	line-height: normal;
	text-align: center;
	font-weight: 300;
	padding: 4em 0;
`;

console.log('App; style ', style);

const cx = classNames.bind(style);

const cxScss = classNames.bind(styleScss);

export default () => (
	<div>
		<div className='src_css_rule'>load from src/abc.css</div>
		<div className='src_scss_rule'>load from src/def.scss</div>
		<div className='scss_scss_rule'>rule in /scss/styles.scss</div>
		<div className={cxScss('scss_module_css_rule')}>load from src/scss.modules.scss</div>
		<Intro>Styled Component</Intro>

		<div className={cx('container')}>
			<ResizePanel direction='s'>
				<div className={cx('header', 'panel')}>
					<span>header</span>
				</div>
			</ResizePanel>
			<div className={cx('body')}>

				<ResizePanel direction='e' style={{ flexGrow: '1' }} >
					<div className={cx('sidebar', 'withMargin', 'panel')}>left panel<br />
				with margin <br />default 50% of content area using flex-grow
					</div>
				</ResizePanel>
				<div className={cx('content', 'panel')}>content</div>
				<ResizePanel direction='w' style={{ width: '400px' }} handleClass={style.customHandle}
					borderClass={style.customResizeBorder}>
					<div className={cx('sidebar', 'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
				</ResizePanel>

			</div>

			<ResizePanel direction='n' style={{ height: '200px' }}>
				<div className={cx('footer', 'panel')}>
					<div className={cx('footerArea')}>
						<div className={cx('footerAreaContent')}>
							<span>footer area, min height: 100px</span>
						</div>
					</div>
					<div className={cx('footerBottomBar')}>
          bottom bar
					</div>
				</div>
			</ResizePanel>
		</div>
	</div>
);
