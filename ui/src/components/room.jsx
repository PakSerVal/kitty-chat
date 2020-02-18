import React from "react";
import Message from "./message";
import RoomHeader from "./room-header";
import MessageInput from "./message-input";

/**
 * @property {AuthData} props.authData
 *
 * @property {MessageData[]} state.messages
 */
export default class Room extends React.Component{
    constructor(props) {
        super(props);

        this.socket = new WebSocket('wss://' + window.location.hostname + '/room');

        this.state = {
            messages: [],
        };
    }


    componentDidMount() {
        this.socket.onopen = () => {
            console.log("Socket opened");
        };

        this.socket.onmessage = (evt) => {
            console.log("Message received");

            const message = JSON.parse(evt.data);

            const messages = [].slice.call(this.state.messages);
            messages.push(message);

            this.setState({messages})
        };

        this.socket.onclose = () => {
            console.log("Socket closed");
        }
    }

    render() {
        return <div className={"room"}>
            <RoomHeader authData={this.props.authData} />
            <div className={"room__messages"}>
                <div className={"room__messages-box"}>
                    {
                        0 !== this.state.messages.length
                            ? this.state.messages.map((message, key) => {
                                return <Message key={key} message={message} />
                            })
                            : <div className={"room__messages_none"}>No messages yet!</div>
                    }
                </div>
                <div className={"room__message-input"}>
                    <MessageInput
                        socket    = {this.socket}
                        avatarUrl = {this.props.authData.avatarUrl}
                        nickname  = {this.props.authData.nickName}
                    />
                </div>
            </div>
        </div>
    }
}
