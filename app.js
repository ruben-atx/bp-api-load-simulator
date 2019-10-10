const yargs = require('yargs');
const rp = require('request-promise');

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

// Map CLI argument values to loadTest option parameters.
const args = {
    url: argv.url,
    maxRequests: argv.maxRequests,
    concurrency: argv.concurrent ? argv.concurrent : 1,
    requestsPerSecond: argv.requestsPerSecond
};

// options for request-promise
let options = {
    method: 'POST',
    uri: args.url,
    body: {},
    json: true,
    headers: {
        Authorization: 'Bearer 7fdea8bdd205f364fce92cc0c28a1e0a'
    }
};

// divide max requests by number of concurrent calls. i.e. concurrency = 2, max requests = 10, -> 5 requests sent per call.
let splitRequests = Math.ceil(args.maxRequests / args.concurrency);

for (let i = 0; i < args.concurrency; i++) {
    postRequests(splitRequests, options);
}

async function postRequests(maxRequests, options) {
    for (let k = 0; k < maxRequests; k++) {

        // Generic BigPanda Alert payload to send with requests.
        options.body = {
            app_key: "5da30a06f61c3d81bf13cc83f0808fbc",
            status: "critical",
            host: `aws-east-production-database-${Math.floor(Math.random() * 100)}`,
            check: "CPU overloaded",
            description: "CPU is above upper limit (70%)",
            cluster: "east-production-databases"
        };

        rp(options)
            .then(function (parsedBody) {
                console.log(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}