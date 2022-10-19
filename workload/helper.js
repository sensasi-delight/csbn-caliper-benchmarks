"use strict";

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');

const clearLedger = async (workloadModule) => {
  if (workloadModule.workerIndex != 0) {
    console.log(`Worker ${workloadModule.workerIndex}: skip deleting asset(s) to avoid crash`);
  }

  if (workloadModule.workerIndex == 0) {
    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'readAssets',
      contractArguments: [ENV.assetType, JSON.stringify([ENV.orgName])],
      readOnly: true
    };

    const result = await workloadModule.sutAdapter.sendRequests(myArgs);

    const batches = JSON.parse(result.status.result.toString());

    if (batches.length == 0) {
      console.log(`Worker ${workloadModule.workerIndex}: skip deleting asset(s), there is no ${ENV.assetType} asset(s) on the ledger`);
    }

    if (batches.length > 0) {
      console.log(`Worker ${workloadModule.workerIndex}: Deleting ${batches.length} asset(s)`);

      const requests = batches.map(batch => {
        const keys = batch.Key.split('\x00');
        keys.shift();
        const type = keys.shift();
        keys.pop();

        const request = {
          contractId: ENV.contractId,
          contractFunction: 'deleteAsset',
          contractArguments: [type, JSON.stringify(keys)],
          readOnly: false
        };

        return workloadModule.sutAdapter.sendRequests(request);
      });

      const onSuccessMessage = `Worker ${workloadModule.workerIndex}: ${batches.length} asset(s) are deleted`;
      await Promise.all(requests).then(() => console.log(onSuccessMessage));
    }
  }
}

const iwmCreateAssets = async (workloadModule) => {
  clearLedger(workloadModule);
  console.log(`Worker ${workloadModule.workerIndex}: Creating ${ENV.nAsset} asset(s)`);

  const sendRequests = [];

  for (let i = 0; i < ENV.nAsset; i++) {

    const data = { ...BATCH_SAMPLE };
    data.id = workloadModule.workerIndex + '_' + i;
    data.date = ENV.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ENV.orgName, ...keysDate, workloadModule.workerIndex, i];

    const request = {
      contractId: ENV.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['create', ENV.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    sendRequests.push(workloadModule.sutAdapter.sendRequests(request));
  }

  const onSuccessMessage = `Worker ${workloadModule.workerIndex}: ${ENV.nAsset} asset(s) are created`;

  return Promise.all(sendRequests).then(() => console.log(onSuccessMessage));
}

const sleep = async (second, workloadModule) => {
  console.log(`Worker ${workloadModule.workerIndex}: waiting for ${second} sec(s)`);

  const sleepPromise = new Promise(resolve => setTimeout(resolve, second * 1000));

  const onSuccessMessage = `Worker ${workloadModule.workerIndex}: i'm am ready to work`;
  return sleepPromise.then(() => console.log(onSuccessMessage));
};



exports.iwmCreateAssets = iwmCreateAssets;
exports.clearLedger = clearLedger;
exports.sleep = sleep;