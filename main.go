package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"react-chat/api"
	"react-chat/config"
	"react-chat/models"
)

func determineListenAddress() (string, error) {
	port := os.Getenv("PORT")
	if port == "" {
		return "", fmt.Errorf("$PORT not set")
	}
	return ":" + port, nil
}

func main() {
	addr, err := determineListenAddress()

	if err != nil {
		log.Fatal("Defining port error")
	}

	serverRun(addr)
}

func serverRun(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		t := template.Must(template.ParseFiles("ui/public/index.html"))
		t.Execute(writer, config.Config)
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
