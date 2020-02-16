import React from "react";
import Message from "./message";

/**
 * @property {AuthData} props.authData
 */
export default class RoomHeader extends React.Component{
    render() {
        return <div className={"room-header"}>
            <div className={"room-header__user"}>
                <div className={"room-header__user-greeting"}>Welcome to kitty chat!</div>
                <div className={"room-header__user-nickname"}>{this.props.authData.nickName}</div>
                <div className={"room-header__user-avatar"}><img src={this.props.authData.avatarUrl} alt="avatar_url"/></div>
            </div>
        </div>
    }
}
