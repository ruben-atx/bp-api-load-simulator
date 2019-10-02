const yargs = require('yargs');
const loadtest = require('loadtest');

// The following is a wrapper around the loadTest npm package. Luckily it has an api so we
// can include application specific behavior necessary for testing our endpoints. The underlying
// package can be used independently of this application. See https://www.npmjs.com/package/loadtest

// Define CLI arguments to pass as options into the loadTest client.
const argv = yargs
    .options({
        'concurrent': {
            alias: 'c',
            describe: 'How many clients to start in parallel.'
        },
        'maxRequests': {
            demandOption: true,
            alias: 'max',
            describe: 'Max number of requests made. Can be larger if concurrent is defined as more than 1.'
        },
        'requestsPerSecond': {
            demandOption: true,
            alias: 'rps',
            describe: 'Number of requests made per second.'
        },
        'endpoint': {
            demandOption: true,
            alias: 'url',
            describe: 'The endpoint url to load test.'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// Generic BigPanda Alert payload to send with requests.
const alert = {
    app_key: "some_app_key",
    status: "critical",
    host: "aws-east-production-database-1",
    check: "CPU overloaded",
    description: "CPU is above upper limit (70%)",
    cluster: "east-production-databases"
};

// Map CLI argument values to loadTest option parameters.
const options = {
    url: argv.url,
    maxRequests: argv.maxRequests,
    concurrency: argv.concurrent ? argv.concurrency : 1,
    requestsPerSecond: argv.requestsPerSecond,
    method: 'POST',
    body: JSON.stringify(alert),
    contentType: "application/json"
};

loadtest.loadTest(options, (error, result) => {
    if (error) {
        return console.error('Got an error: %s', error);
    }

    console.log('---- Test Results ----');
    console.log(result);
});
