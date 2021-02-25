import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";

import {ProfileCard} from "./components/ProfileCard/ProfileCard";
import {Navigation} from "./components/Navigation/Navigation";

import News from "./pages/News/News";
import Friends from "./pages/Friends/Friends";
import {Profile} from './pages/Profile/Profile';
import Message from './pages/Message/Message';
import Groups from './pages/Groups/Groups';
import Settings from './pages/Settings/Settings';
import {localURL} from "./const";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {Loader} from "./components/Loader/Loader";
import {Image} from "./pages/image/Image";
import Group from "./pages/Groups/GroupPage/Group";
import Music from './pages/Music/Music'

class App extends React.Component {

    state = {
        user: {},
        loading: true
    }

    async componentDidMount() {
        await fetch(`${localURL}/auth/login`)
            .then(res => res.json())
            .then(res => this.setState({
                user: res,
                loading: false
            }))
            .catch(e => console.log(e))
    }

    render() {
        const LoginRoutes = () => {
            return(
                <div className="container">
                    <div className="left-side">
                        <ProfileCard user={this.state.user.user} />
                        <Navigation user={this.state.user.user} />
                    </div>
                    <div className="right-side">
                        <Switch>
                            <Route path="/news" exact>
                                <News user={this.state.user.user} />
                            </Route>
                            <Route path="/profile/:login" exact>
                                <Profile user={this.state.user.user} />
                            </Route>
                            <Route path="/friends" exact>
                                <Friends user={this.state.user.user} />
                            </Route>
                            <Route path="/message" exact>
                                <Message user={this.state.user.user} />
                            </Route>
                            <Route path="/groups" exact>
                                <Groups user={this.state.user.user} />
                            </Route>
                            <Route path="/settings" exact>
                                <Settings user={this.state.user.user} />
                            </Route>
                            <Route path="/group/:id" exact>
                                <Group user={this.state.user.user} />
                            </Route>
                            <Route path="/image/:id" exact>
                                <Image />
                            </Route>
                            <Route path="/music" exact>
                                <Music />
                            </Route>
                            <Redirect to="/news" />
                        </Switch>
                    </div>
                </div>
            )
        }

        const UnLoginRoutes = () => {
            return (
                <Switch>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Redirect to="/login" />
                </Switch>
            )
        }
        const checkRoutes = isAuth => {
            if (isAuth) {
                return (
                    <LoginRoutes />
                )
            } else if (!isAuth) {
                return (
                    <UnLoginRoutes />
                )
            }
        }

        return(
            <>
                {this.state.loading ? <Loader /> : checkRoutes(this.state.user.message)}
            </>
        )
    }
}

export default App;
