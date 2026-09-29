#!/bin/sh
echo "Hello $INPUT_MY_NAME"                          # reads the input
echo "Hello $INPUT_MY_NAME" > greeting.txt           # writes a file into the workspace
echo "time=$(date)" >> "$GITHUB_OUTPUT"              # sends an output back