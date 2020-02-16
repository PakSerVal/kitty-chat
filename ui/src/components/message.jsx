import React from "react";

/**
 * @property {MessageData} props.message
 * @property {string}      props.userNickname
 */
export default class Message extends React.Component {
    render() {
        return <div className={"message"}>
            <div className={"message__avatar"}>
                <img src={this.props.message.AvatarUrl} alt="avatar"/>
            </div>
            <div className={"message__nickname-text"}>
                <div className={"message__nickname"}>{this.props.message.Nickname}</div>
                <div className={"message__text"}>{this.props.message.Text}</div>
            </div>
        </div>
    }
}
