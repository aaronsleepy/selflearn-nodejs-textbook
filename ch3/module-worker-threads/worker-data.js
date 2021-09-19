const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

if (isMainThread) {
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1}
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2}
    }));

    for (let worker of threads) {
        worker.on('message', value => {
            console.log('from worker:', value);
        });
        worker.on('exit', exitCode => {
            console.log('worker exit with: ', exitCode);
            threads.delete(worker);
            if(0 === threads.size) {
                console.log('job done');
            }
        });
    }
} else {
    parentPort.postMessage(workerData.start + 100);
}