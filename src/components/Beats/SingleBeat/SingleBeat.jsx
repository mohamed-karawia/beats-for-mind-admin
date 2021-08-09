import React from 'react';
import { deleteBeat } from '../../../store/actions';
// Styles
import classes from './SingleBeat.module.scss';

const SingleBeat = (props) => {
    const deleteBeat = (id) => {
        props.deleteBeat(id)
    }
    return (
        <div className={classes.Beat}>
            <div className={classes.Beat__img}>
                <img src={props.beat.image} alt="" />
            </div>
            <div className={classes.Beat__title}>
                <h3>{props.beat.name}</h3>
            </div>
            <div className={classes.Beat__button}>
                <button onClick={e => {deleteBeat(props.beat._id)}}>delete</button>
            </div>
        </div>
    )
}

export default SingleBeat
