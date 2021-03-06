import React from "react";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {urls} from "./const/Urls";
import LoginComponent from "./components/LoginComponent";
import MainPageComponent from "./components/MainPageComponent";
import './resources/css/main.css'


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSuccessfulLogin = (data, header) => {
        localStorage.setItem("TOKEN", header);
        localStorage.setItem("USER_NAME", data.login);
        localStorage.setItem("ROLE", data.roles[0]);
        this.props.history.push(urls.mainPage);
    };

    clearLocalStorageAndCookies = () => {
        localStorage.clear();
        window.location.href = urls.login;
    };

    checkLocalStorage = () => {
        if (localStorage.getItem("ROLE") === null ||
            localStorage.getItem("USER_NAME") === null) {
            this.clearLocalStorageAndCookies();
        }
    };


    render() {
        if (localStorage.getItem("ROLE") === "ROLE_ADMIN") {
            this.checkLocalStorage();
            return (
                <div className={"background"}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route path={urls.mainPage}>
                                <MainPageComponent/>
                            </Route>
                            <Route path={"/"}>
                                <Redirect to={urls.mainPage}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            );

        } else {
            localStorage.clear();
            return (
                <div>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route path={urls.login}>
                                <LoginComponent onSuccessfulLogin={this.handleSuccessfulLogin}/>
                            </Route>

                            <Route path={"/"}>
                                <Redirect to={urls.login}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        }

    }
}

export default withRouter(App);