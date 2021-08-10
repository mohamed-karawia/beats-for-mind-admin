import React from 'react';
import classes from './Downloads.module.scss';
// Redux
import { useSelector } from 'react-redux';
// Components
import Spinner from '../Spinner/Spinner';

const Downloads = (props) => {

    const setAmount = (amount) => {
        props.setAmount(amount)
    }

    const sendBeats = (e) => {
        e.preventDefault()
        props.sendFreeBeats()
    }

    const closeDownloads = () => {
        props.closeDownloads();
        
    }

    const loading = useSelector(state => state.users.sendMsgLoading)
    const response = useSelector(state => state.users.sendMsgRes)
    const error = useSelector(state => state.users.sendMsgError)

    return (
        <div className={classes.Downloads}>
            <h2>Send {props.downloadsType === 'per-day' ? 'Beats per day' : 'Free Beats'}</h2>
                <form className={classes.Downloads__form} onSubmit={event => sendBeats(event)}>
                    <div className={classes.Downloads__form__box}>
                        <label>Number</label>
                        <input type="number" value={props.amount} onChange={e => setAmount(e.target.value)}/>
                    </div>
                    {/* {error && <p style={{fontSize: '1.5rem', color: 'red', marginBottom: '1rem'}}>{error}</p>} */}
                    {response && <p style={{color: 'green', fontSize: '1.5rem', marginBottom: '1rem'}}>{response}</p>}
                    {error && <p style={{color: 'red', fontSize: '1.5rem', marginBottom: '1rem'}}>{error}</p>}
                    <button type="submit">{loading? <Spinner /> : 'Submit'}</button>
                    <button  onClick={closeDownloads} className={classes.Cancel}>Close</button>
                </form>
        </div>
    )
}

export default Downloads
