package config

type config struct {
	HOST string
}

var Config = config{
	HOST: "localhost",
}
