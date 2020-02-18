package config

type config struct {
	HOST string
}

var Config = config{
	HOST: "https://pakman-go-react-chat.herokuapp.com/",
}
