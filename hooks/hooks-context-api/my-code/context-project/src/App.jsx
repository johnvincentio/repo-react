
import React from 'react';
import Navbar from './Navbar';
import Form from './Form';
import PageContent from './PageContent';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => (
	<ThemeProvider>
		<PageContent>
			<Navbar />
			<Form />
		</PageContent>
	</ThemeProvider>
);

export default App;
