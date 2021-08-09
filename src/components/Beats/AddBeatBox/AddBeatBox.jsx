import React, {useState} from 'react'
// Styles
import classes from './AddBeatBox.module.scss';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import Spinner from '../../Spinner/Spinner';

const AddBeatBox = (props) => {
    const dispatch = useDispatch()
    const [beatName, setBeatName] = useState('');
    const [selectedImg, setSelectedImg] = useState();
    const [selectedAudio, setSelectedAudio] = useState();
    const loading = useSelector(state => state.beats.addBeatLoading)
    const error = useSelector(state => state.beats.addBeatError)
    const onImageChange = (e) => {
        setSelectedImg(e.target.files[0])
    }

    const onAudioChange = (e) => {
        setSelectedAudio(e.target.files[0])
    }

    const addBeat = (event) => {
        event.preventDefault();
        const beat = new FormData();
        beat.append('name', beatName)
        beat.append('image', selectedImg)
        beat.append('image', selectedAudio)
        props.onAddBeat(beat)
    }

    const closeAddBeat = () => {
        dispatch(actions.setOpenAddBeat(false))
    }
    return (
        <div className={classes.Add__box}>
                <h2>Add Beat</h2>
                <form className={classes.Add__box__form} onSubmit={event => addBeat(event)}>
                    <div className={classes.Add__box__form__box}>
                        <label>name</label>
                        <input type="text" value={beatName} onChange={e => setBeatName(e.target.value)}/>
                    </div>
                    <div className={classes.Add__box__form__box}>
                        <label>Image</label>
                        <input type="file" onChange={e => onImageChange(e)}/>
                    </div>
                    <div className={classes.Add__box__form__box}>
                        <label>beat</label>
                        <input type="file" onChange={e => onAudioChange(e)} />
                    </div>
                    {error && <p style={{fontSize: '1.5rem', color: 'red', marginBottom: '1rem'}}>{error}</p>}
                    <button type="submit">{loading ? <Spinner /> : 'Submit'}</button>
                    <button  onClick={closeAddBeat} className={classes.Cancel}>Cancel</button>
                </form>
            </div>
    )
}

export default AddBeatBox
