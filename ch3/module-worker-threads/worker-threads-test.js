const {Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', value => {
        console.log('from worker:', value);
    });
    worker.on('exit', exitCode => {
        console.log('worker exit with: ', exitCode);
    });
    worker.postMessage('ping');
} else {
    parentPort.on('message', value => {
        console.log('from parent:', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}