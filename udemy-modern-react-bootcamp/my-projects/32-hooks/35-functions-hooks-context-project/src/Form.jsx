/* eslint-disable react/prefer-stateless-function */

import React, { useContext } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles/FormStyles';

import { LanguageContext } from './contexts/LanguageContext';

import { WORDS } from './Words';

function Form(props) {
	const { language, changeLanguage } = useContext(LanguageContext);
	const { classes } = props;
	const { signin, email, password, remember } = WORDS[language];
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{signin}</Typography>
				<Select value={language} onChange={changeLanguage}>
					<MenuItem value='english'>English</MenuItem>
					<MenuItem value='french'>French</MenuItem>
					<MenuItem value='spanish'>Spanish</MenuItem>
				</Select>
				<form className={classes.form}>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='email'>{email}</InputLabel>
						<Input id='email' name='email' autoFocus />
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>{password}</InputLabel>
						<Input id='password' name='password' autoFocus />
					</FormControl>
					<FormControlLabel
						control={<Checkbox color='primary' />}
						label={remember}
					/>
					<Button
						variant='contained'
						type='submit'
						fullWidth
						color='primary'
						className={classes.submit}
					>
						{signin}
					</Button>
				</form>
			</Paper>
		</main>
	);
}

export default withStyles(styles)(Form);
