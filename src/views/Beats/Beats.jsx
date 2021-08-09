import React, {useEffect, useState} from 'react';
// Styles
import classes from './Beats.module.scss';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
// react-router
import { useLocation, useHistory } from 'react-router-dom'
// Queries
import queryString from 'query-string';
// Components
import BeatsList from '../../components/Beats/BeatsList/BeatsList';
import Spinner from '../../components/Spinner/Spinner'
import Backdrop from '../../components/Beats/Backdrop/Backdrop';
import AddBeatBox from '../../components/Beats/AddBeatBox/AddBeatBox';
// Pagination component
import Pagination from "react-js-pagination";

const Beats = () => {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [queries, setQueries] = useState(queryString.parse(search))

    const beats = useSelector(state => state.beats.beats);
    const total = useSelector(state => state.beats.total);
    const loading = useSelector(state => state.beats.loading);
    const openAddBeat = useSelector(state => state.beats.openAddBeat)

    useEffect(() => {
        dispatch(actions.getBeats(queries))
    }, [queries])

    const onAddBeat = (beat) => {
        dispatch(actions.addBeat(beat, queries))
    }

    const setOpenAddBeat = () => {
        dispatch(actions.setOpenAddBeat(true))
    }

    const deleteBeat = (id) => {
        const data = {
            id: id
        }
        console.log(data)
        dispatch(actions.deleteBeat(data, queries))
    }

    const changePage = (pageNum) => {
        setQueries({...queries, page: Number(pageNum)})
    }


    return (
        <div className={classes.Beats}>
            <h1>Beats</h1>
            <button className={classes.addBeat} onClick={setOpenAddBeat}>Add beat</button>
            {loading ? <Spinner color="purple"/> : <BeatsList deleteBeat={deleteBeat} beats={beats} />}
            {openAddBeat && <Backdrop><AddBeatBox onAddBeat={onAddBeat}/></Backdrop>}
            {total > 10 &&<div className={classes.pagination}>
                <Pagination
                    activePage={queries.page}
                    itemsCountPerPage={10}
                    totalItemsCount={total}
                    innerClass={classes.pagination__list}
                    linkClass={classes.pagination__list__item}
                    activeLinkClass={`${classes.pagination__list__item } ${classes.pagination__list__item__active}`}
                    onChange={changePage}
                />
            </div>}
        </div>
    )
}

export default Beats
