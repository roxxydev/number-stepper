#!/bin/bash

filename=.env
if [ ! -f $filename ]
then
  printf "API_PREFIX=api\nDB_PORT=27017\nDB_NAME=test" >> $filename
fi
