import React from 'react';
import classes from './Backdrop.module.scss';


const AddBeat = (props) => {
    
    
    return (
        <div className={classes.Add}>
            {props.children}
        </div>
    )
}

export default AddBeat
