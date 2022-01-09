#!/bin/bash

filename=.env
if [ ! -f $filename ]
then
  echo "API_PREFIX=api" >> $filename
fi
