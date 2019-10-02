const yargs = require('yargs');
const loadtest = require('loadtest');

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

const alert = {
    app_key: "some_app_key",
    status: "critical",
    host: "aws-east-production-database-1",
    check: "CPU overloaded",
    description: "CPU is above upper limit (70%)",
    cluster: "east-production-databases"
};

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
