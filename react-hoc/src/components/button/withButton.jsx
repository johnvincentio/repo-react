
/*
* withButton is an example of a HOC
*/

import React from 'react';

import Button from './Button';

const withButton = Element => props => <Button {...props} className="ui button primary" />

export default withButton;
