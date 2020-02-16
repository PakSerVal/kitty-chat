import React from "react";
import Room from "./room";
import Auth from "./auth";
import {getAuthData} from "../services/auth";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.checkAuth = this.checkAuth.bind(this);

        this.state = {
            authData: null,
        };
    }

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth() {
        const authData = getAuthData();

        if (authData === null) {
            return;
        }

        this.setState({authData: getAuthData()});
    }

    render() {
        return <React.Fragment>
            {
                null !== this.state.authData
                    ? <Room authData={this.state.authData} />
                    : <Auth onSubmitAuth={this.checkAuth} />
            }
        </React.Fragment>
    }
}
