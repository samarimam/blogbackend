import Header from "./components/Header";
import Home from "./components/home/Home";
import "./App.css";
import { useHistory, Switch, Route } from "react-router-dom";
import React from "react";
import { Box } from "@material-ui/core";
import DetailView from "./components/post/DetailView";
import CreateView from "./components/post/CreateView";
import UpdateView from "./components/post/UpdateView";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaAuthConfig, oktaSignInConfig } from "./config";
import Login from "./components/account/Login";

const oktaAuth = new OktaAuth(oktaAuthConfig);

function AppWithRouterAccess() {
    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    const customAuthHandler = () => {
        history.push("/login");
    };

    return (
        <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
        >
            <SecureRoute path='/' component={Header} />
            <Box style={{ marginTop: 64 }}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    {/* <DetailView /> */}
                    <Route
                        path='/login'
                        render={() => <Login config={oktaSignInConfig} />}
                    />
                    <Route path='/login/callback' component={LoginCallback} />
                    <Route exact path='/details/:id' component={DetailView} />
                    <Route exact path='/create' component={CreateView} />
                    <Route exact path='/update/:id' component={UpdateView} />
                </Switch>
            </Box>
        </Security>
    );
}

export default AppWithRouterAccess;
