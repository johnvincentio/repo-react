
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// eslint-disable-next-line function-paren-newline
export default createDevTools(
	<DockMonitor
		toggleVisibilityKey="ctrl-h"
		changePositionKey="ctrl-q"
		changeMonitorKey="ctrl-m"
		defaultPosition="bottom"
	>
		<LogMonitor />
	</DockMonitor>);
