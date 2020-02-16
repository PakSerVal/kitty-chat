package models

import (
	"github.com/gorilla/websocket"
)

type client struct {
	socket   *websocket.Conn
	room     *room
	messages chan *message
}

func (c *client) read() {
	defer c.socket.Close()

	for {
		var message *message
		err := c.socket.ReadJSON(&message)

		if err != nil {
			return
		}

		c.room.queue <- message
	}
}

func (c *client) write() {
	defer c.socket.Close()

	for msg := range c.messages {
		err := c.socket.WriteJSON(msg)
		if err != nil {
			break
		}
	}
}
