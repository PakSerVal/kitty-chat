package main

import (
	"html/template"
	"log"
	"net/http"
	"react-chat/api"
	"react-chat/config"
	"react-chat/models"
)

func main() {
	configuration, err := config.Load()

	if err != nil {
		log.Fatal("Defining port error")
	}

	serverRun(configuration.ADDR)
}

func serverRun(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		t := template.Must(template.ParseFiles("ui/public/index.html"))
		t.Execute(writer, nil)
	})

	http.Handle("/assets/",
		http.StripPrefix("/assets/",
			http.FileServer(http.Dir("./ui/public"))))

	http.Handle("/avatars/",
		http.StripPrefix("/avatars/",
			http.FileServer(http.Dir("./avatars"))))

	// -- Api
	http.HandleFunc("/api/get-avatars", api.AvatarHandler)
	// -- -- -- --

	// -- Room
	room := models.NewRoom()
	go room.Run()
	http.Handle("/room", room)
	// -- -- -- -- --

	if err := http.ListenAndServe(addr, nil); err == nil {
		log.Fatal("Listen server error")
	}
}
