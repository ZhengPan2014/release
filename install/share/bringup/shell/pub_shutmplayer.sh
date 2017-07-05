#!/bin/bash
NAME=$(ps -A | grep mplayer | awk 'NR==1{print $1}')
kill $NAME
