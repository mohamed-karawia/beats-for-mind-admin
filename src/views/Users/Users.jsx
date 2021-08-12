import React, { useEffect, useState } from 'react';
// Syles
import classes from './Users.module.scss';
// Redux
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
// Components
import Spinner from '../../components/Spinner/Spinner';
import SendUser from '../../components/SendUser/SendUser';
import Backdrop from '../../components/Beats/Backdrop/Backdrop'
import Downloads from '../../components/Downloads/Downloads';
// Pagination component
import Pagination from "react-js-pagination";
import axios from 'axios';

const Users = () => {
    const [type, setType] = useState('');
    const [userId, setUserId] = useState('');
    const [downloadsType, setDownloadsType] = useState('');
    const [amount, setAmount] = useState(0);
    const [openDownloads, setOpenDownloads] = useState('');
    const [page, setPage] = useState(1)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getUsers(page))
        // eslint-disable-next-line
    }, [page])

    const token = useSelector(state => state.auth.token)
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);
    const total = useSelector(state => state.users.total);
    const openSendMsg = useSelector(state => state.users.openSendMsg)

    const setOpenAddBeat = (type, id) => {
        setUserId(id)
        setType(type)
        dispatch(actions.setOpenSendMsg(true))
    }

    const sendSMS = (message) => {
        const data = {
            userId: userId,
            message
        }
        dispatch(actions.sendEmail(data))
    }

    const openUserDownloads = (userId, type) => {
        setUserId(userId);
        setDownloadsType(type);
        setOpenDownloads(true)
    }

    const changeAmount = (amount) => {
        setAmount(amount)
    }

    const closeDownloads = () => {
        setOpenDownloads(false);
        setUserId('');
        setDownloadsType('');
        setAmount(0);
        dispatch(actions.getUsers())
    }

    const sendFreeBeats = () => {
        const data = {
            userId,
            type: downloadsType,
            amount
        }
        dispatch(actions.sendFreeBeats(data))
    }

    const changePage = (pageNum) => {
        setPage(Number(pageNum))
    }

    // 'https://beats-for-minds.herokuapp.com/admin/music/user/csv'

    const downloadCsv = () =>{
        const downloadLink = `${process.env.REACT_APP_BASE_LINK}/admin/music/user/csv/?token=${token}`
        const win = window.open(downloadLink, '__blank');
        win.focus()
    }

    return (
        <div className={classes.Users}>
            {loading ? <Spinner color="purple" /> : <>
            <button onClick={downloadCsv} className={classes.csv}>Download CSV</button>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Downloads Per Day</th>
                    <th>Free Downloads</th>
                    <th>Take Action</th>
                </tr>
                {users.length > 0 ? (users.map(user => (<tr key={user._id}>
                    <td>{user.local ? `${user.local.first_name} ${user.local.last_name}` : user.google ? user.google.name : user.facebook.name}</td>
                    <td>{user.local ? user.local.email : user.google ? user.google.email : user.facebook.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.downloadsPerDay}</td>
                    <td>{user.freeDownloads}</td>
                    <td className={classes.actions}>
                        <button className={classes.actions__sms} disabled={!user.mobile} onClick={e => setOpenAddBeat('sms', user._id)}>SMS</button>
                        <button className={classes.actions__beat} onClick={e => openUserDownloads(user._id, 'free')}>Give Free beats</button>
                        <button className={classes.actions__beat} onClick={e => openUserDownloads(user._id, 'per-day')}>Beats per day</button>
                    </td>
                </tr>))) : null}
            </table></>}
            {openSendMsg && <Backdrop><SendUser type={type} sendSMS={sendSMS} /></Backdrop>}
            {openDownloads && <Backdrop>
                <Downloads
                    amount={amount}
                    setAmount={changeAmount}
                    sendFreeBeats={sendFreeBeats}
                    closeDownloads={closeDownloads} /></Backdrop>}
            {total > 10 && <div className={classes.pagination}>
                <Pagination
                    activePage={page}
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

export default Users
