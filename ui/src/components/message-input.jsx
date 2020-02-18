import React from "react";

/**
 * @property {WebSocket} props.socket
 * @property {WebSocket} props.nickname
 * @property {WebSocket} props.avatarUrl
 *
 * @property {string} state.message
 */
export default class MessageInput extends React.Component{
    constructor(props) {
        super(props);

        this.submitHandler  = this.submitHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);

        this.state = {
            message: "",
        };
    }

    submitHandler() {
        this.props.socket.send(JSON.stringify({
            AvatarUrl: this.props.avatarUrl,
            Nickname:  this.props.nickname,
            Text:      this.state.message,
        }));

        this.setState({
            message: "",
        });
    }

    keyDownHandler(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.submitHandler();
        }
    }

    render() {
        return <div className={"message-input"}>
                <textarea
                    className={"message-input__field"}
                    onChange={(e) => this.setState({message: e.target.value})}
                    onKeyDown={this.keyDownHandler}
                    value={this.state.message}
                    placeholder="Type your message..."
                    tabIndex={0}
                />
                <div className={"message-input__btn"}>
                    <a className={"btn"} onClick={this.submitHandler}>Send</a>
                </div>
            </div>
    }
}
