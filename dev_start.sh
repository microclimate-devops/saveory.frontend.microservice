#! /bin/bash
docker build . -t saveory-frontend -f Dockerfile_dev
docker run -it -p 3001:3001 --rm saveory-frontend

