package config

type config struct {
	ADDR string
}

var Config = config{
	ADDR: "localhost:8085",
}
