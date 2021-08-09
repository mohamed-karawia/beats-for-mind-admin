import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = (props) => {
    return (<div 
        className={props.color? `${classes.loader} ${classes.purple}` : classes.loader}>Loading...</div>)
}

export default Spinner
