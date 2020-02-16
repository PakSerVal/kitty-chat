package models

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

type room struct {
	join    chan *client
	leaves  chan *client
	clients map[*client]bool
	queue   chan *message
}

func NewRoom() *room {
	return &room{
		join:    make(chan *client),
		leaves:  make(chan *client),
		clients: make(map[*client]bool),
		queue:   make(chan *message),
	}
}

func (r *room) Run() {
	for {
		select {
		case c := <-r.join:
			r.clients[c] = true
		case c := <-r.leaves:
			delete(r.clients, c)
			close(c.messages)
		case msg := <-r.queue:
			for client := range r.clients {
				client.messages <- msg
			}
		}
	}
}

var upgrader = &websocket.Upgrader{ReadBufferSize: socketBufferSize, WriteBufferSize: messageBufferSize}

func (r *room) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	socket, err := upgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Fatal("Server error: can not create a socket", err)

		return
	}

	client := &client{room: r, socket: socket, messages: make(chan *message)}
	r.join <- client

	defer func() { r.leaves <- client }()

	go client.write()
	client.read()
}
