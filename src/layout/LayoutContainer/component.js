import React, { Component } from 'react';
import navigation from './../../_nav';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../routes';
import AuthService from '../../utils/authService';

const Auth = new AuthService();
const isLogin = Auth.getToken();

export default class LayoutContainer extends Component {
  state = {
    activeMenuSub: "",
  };

  componentDidMount() {
    if(!isLogin) {
      this.props.history.push('/login');
    }
  }

  _handleClickMenu = (value) => {
    const { activeMenuSub } = this.state;
    const activeNavbar = document.getElementById(activeMenuSub);

    if(activeNavbar !== null && activeMenuSub !== value) {
      activeNavbar.classList.add('hide')
    } else if (activeMenuSub === "") {
      return
    }
  }

  _handleOpenSubMenu = (value) => {
    const activeNavbar = document.getElementById(value);

    this._handleClickMenu(value);

    if(activeNavbar.classList.contains('hide')) {
      activeNavbar.classList.remove('hide');
    } else {
      activeNavbar.classList.add('hide');
    }

    this.setState({
      activeMenuSub: value,
    })
  }

  render() {
    return (
      <div className='layout-container'>
        <div className="sidebar">
          <h1 className="title-school">SMK PELITA DEPOK</h1>
          <div className="menu-container">
            {
              navigation.filter(nav => nav.permission === "").map((item, idx) => {
                return (
                  !item.subMenu ? (
                    <NavLink to={item.path} key={idx} onClick={() => this._handleClickMenu(item.value)} >
                      <div className="menu-wrapper">
                        <div className="standar">
                          <div className={`circle-sign ${item.path === window.location.pathname ? 'active' : ''}`}></div>
                          <img src={item.icon} alt={item.value} />
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </NavLink>
                  ) : (
                    <React.Fragment key={idx} >
                      <div  className="menu-wrapper with-submenu" onClick={() => this._handleOpenSubMenu(item.value)}>
                        <div className="standar">
                          <div className={`circle-sign ${item.path === window.location.pathname ? 'active' : ''}`}></div>
                          <img src={item.icon} alt={item.value} />
                          <p>{item.name}</p>
                        </div>
                        <img src={item.add} alt="down" />
                      </div>
                      <div id={item.value} className={`container-submenu hide`}>
                        <ul>
                          {
                            item.subMenu.map((data, idx) => {
                              return (
                                <NavLink to={`${item.path}${data.path}`} key={idx} >
                                  <li>
                                    <div className={`circle-sign ${`${item.path}${data.path}` === window.location.pathname ? 'active' : ''}`}></div>
                                    <p>{data.name}</p>
                                  </li>
                                </NavLink>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                )
              })
            }
          </div>
        </div>
        <div className="main-content">
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route 
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            })}
            {isLogin ? <Redirect from='/' to='/dashboard' /> : <Redirect from='/' to='/login' />}
          </Switch>
        </div>
      </div>
    )
  }
}
