# BigPanda API Load Simulator

## Description
This application will simulate requests made to the BigPanda Alert API (or any api). 
The volume of requests per time interval id configurable. Can be used to test throttling.

## Installation

    npm install
   
## Usage
The app takes a few arguments to setup the load tes.

_endpoint_: The endpoint url to test.

_concurrent_: Number of clients to run in parallel. Defaults to 1.

_maxRequests_ (required): Maximum number of requests to make to _endpoint_. This number can
be larger depending on defined number of concurrent clients. i.e. _concurrent_ set to 2 and _maxRequests_ set to 5 will 
make a total of 10 requests.

_requestPerSecond_ (required): Number of requests to post per second.

    node app.js --endpoint="https://api.bigpanda.io/data/v2/alerts" --concurrent=2 --maxResults=100 --requestPerSecond=5