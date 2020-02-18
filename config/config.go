package config

import (
	"fmt"
	"os"
)

type config struct {
	ADDR string
}

func Load() (*config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		return nil, fmt.Errorf("$PORT not set")
	}

	return &config{ADDR: ":" + port}, nil
}
