import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// Pages
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Beats from './views/Beats/Beats';
import Users from './views/Users/Users';
// Components
import Navbar from './components/Navbar/Navbar'
// Axios
import axios from 'axios';
// Redux
import * as actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState())
  }, [dispatch])

  const isAuth = useSelector(state => state.auth.token !== null);
  const token = useSelector(state => state.auth.token)

  axios.defaults.baseURL = process.env.REACT_APP_BASE_LINK;
  axios.defaults.headers.common['Authorization'] = `auth ${token}`;

  let routes = (
    <Switch>
        <Route path="/login" component={Login}></Route>
        {(() => {
            if (!localStorage.getItem('token') || new Date(localStorage.getItem('expirationDate')) <= new Date())
                return <Redirect to="/login" />
            else
                return null
        })()}
      </Switch>
  )
  if(isAuth){
    routes = (
      <Switch>
      <Route path="/beats" component={Beats}></Route>
      <Route path="/users" component={Users}></Route>
      <Route path="/" component={Home}></Route>
      <Redirect to="/" />
    </Switch>
    )
  }

  return (
    <Router>
      <Navbar />
      {routes}
  </Router>
  );
}

export default App;
