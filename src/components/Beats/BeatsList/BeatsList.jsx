import React from 'react';
import SingleBeat from '../SingleBeat/SingleBeat';
// Styles
import classes from './BeatsList.module.scss';

const BeatsList = (props) => {
    const deleteBeat = (id) => {
        props.deleteBeat(id)
    }
    return (
        <ul className={classes.BeatsList}>
            {props.beats.map(beat => (
                <li><SingleBeat deleteBeat={deleteBeat} beat={beat.beet} /></li>
            ))}
        </ul>
    )
}

export default BeatsList
