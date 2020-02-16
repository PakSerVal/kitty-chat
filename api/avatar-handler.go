package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func AvatarHandler(writer http.ResponseWriter, request *http.Request) {
	var result []string
	if files, err := ioutil.ReadDir("./avatars"); err == nil {
		result = make([]string, 0, len(files))

		for _, file := range files {
			if file.IsDir() {
				continue
			}

			result = append(result, "/avatars/"+file.Name())
		}
	}

	js, err := json.Marshal(result)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)

		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(js)
}
