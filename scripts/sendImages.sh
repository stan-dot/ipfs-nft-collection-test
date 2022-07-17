#!/bin/bash
ls img **.json | while read i;
do
    cat img/$i |
    curl -X 'POST' \
    'http://localhost:3000/metadata' \
    -H 'accept: */*' \
    -H 'Content-Type: application/json' \
    -d "$(</dev/stdin)";
done;
