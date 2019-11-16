import React, { Component } from "react";
import { connect } from 'react-redux';
import { actions } from './store/duck';
import { isLoginSelector } from './store/selectors';
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './containers/Login';
import AppRouter from './components/AppRouter';

// interface IProps {
//   isLogin: boolean;
//   checkIsLogin: () => void;
// }

const mapStateToProps = (state) => {
  return {
    isLogin: isLoginSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIsLogin: () => dispatch(actions.checkIsLogin())
  }
}

class App extends Component {
  componentDidMount() {
    const {checkIsLogin} = this.props;
    checkIsLogin();
  }
  render() {
    const {isLogin} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" permited={isLogin} component={AppRouter}/>
          <Route exact path="/login" component={Login}></Route>
          <Redirect to="login"></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({component: Component, permited, ...rest}) => (
  <Route {...rest} render={props => permited ? <Component {...props}/> : <Redirect to="/login"/>}></Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);


