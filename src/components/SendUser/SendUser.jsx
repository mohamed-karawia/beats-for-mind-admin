import React, {useState} from 'react';
import classes from './SendUser.module.scss';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
// Components
import Spinner from '../Spinner/Spinner';

const SendUser = (props) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const sendUser = (event) =>{
        event.preventDefault();
        if(props.type === 'sms'){
            props.sendSMS(message)
        }
    }

    const closeSendMsg = () => {
        dispatch(actions.setOpenSendMsg(false))
    }

    const loading = useSelector(state => state.users.sendMsgLoading)
    const response = useSelector(state => state.users.sendMsgRes)
    const error = useSelector(state => state.users.sendMsgError)

    return (
        <div className={classes.Send}>
            <h2>Send {props.type}</h2>
                <form className={classes.Send__form} onSubmit={event => sendUser(event)}>
                    <div className={classes.Send__form__box}>
                        <label>Message</label>
                        <textarea type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>
                    {/* {error && <p style={{fontSize: '1.5rem', color: 'red', marginBottom: '1rem'}}>{error}</p>} */}
                    {response && <p style={{color: 'green', fontSize: '1.5rem', marginBottom: '1rem'}}>{response}</p>}
                    {error && <p style={{color: 'red', fontSize: '1.5rem', marginBottom: '1rem'}}>{error}</p>}
                    <button type="submit">{loading? <Spinner /> : 'Submit'}</button>
                    <button  onClick={closeSendMsg} className={classes.Cancel}>Close</button>
                </form>
        </div>
    )
}

export default SendUser
