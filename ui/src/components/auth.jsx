import React from "react";
import {getAvatarsList} from "../services/api";
import {saveAuthData} from "../services/auth";

/**
 * @property {function} props.onSubmitAuth
 */
export default class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            nickName:          "",
            selectedAvatarUrl: "",
            avatarsList:       [],
        };
    }

    componentDidMount() {
        getAvatarsList().then((avatarsList) => this.setState({avatarsList}));
    }

    submitHandler() {
        if (this.state.nickName === "" || this.state.selectedAvatarUrl === "") {
            return;
        }

        saveAuthData(this.state.nickName, this.state.selectedAvatarUrl);

        this.props.onSubmitAuth();
    }

    render() {
        let btnClassName = "btn";
        if (this.state.nickName === "" || this.state.selectedAvatarUrl === "") {
            btnClassName += " btn_disabled";
        }

        return <div className={"auth"}>
            <h1 className={"auth__title"}>Choose your nickname and avatar</h1>
            <div className={"auth__nickname"}>
                <input
                    id={"nickname"}
                    type="input"
                    value={this.state.nickName}
                    onChange={(e) => {this.setState({nickName: e.target.value})}}
                    className={"auth__nickname-field"}
                    placeholder="Nickname"
                />
                <label htmlFor="nickname" className={"auth__nickname-label"}>Nickname</label>
            </div>
            <h2 className={"auth__avatars-title"}>Choose avatar</h2>
            <div className={"auth__avatars-list"}>
                {
                    this.state.avatarsList.map((avatar, key) => {
                        let className = "auth__avatar";
                        if (this.state.selectedAvatarUrl === avatar) {
                            className += " auth__avatar_selected";
                        }

                        return <div key={key} className={className} onClick={() => this.setState({selectedAvatarUrl: avatar})}>
                            <img src={avatar} alt={"avatar"} />
                        </div>
                    })
                }
            </div>
            <div className={"auth__btn"}>
                <a className={btnClassName} onClick={this.submitHandler}>Save</a>
            </div>
        </div>
    }
}
