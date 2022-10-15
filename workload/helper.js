"use strict";

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');


const iwmCreateAssets = async (workloadModule) => {
  console.log(`Worker ${workloadModule.workerIndex}: Creating ${ENV.nAsset} asset(s)`);

  const sendRequests = [];

  for (let i = 0; i < ENV.nAsset; i++) {

    const data = { ...BATCH_SAMPLE };
    data.id = workloadModule.workerIndex + '_' + i;
    data.date = ENV.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ENV.assetType, ENV.orgName, ...keysDate, data.id];

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

const deleteIwmCreatedAssets = async (workloadModule) => {
  console.log(`Worker ${workloadModule.workerIndex}: Deleting ${ENV.nAsset} asset(s)`);

  const sendRequests = [];

  for (let i = 0; i < ENV.nAsset; i++) {

    const keysDate = ENV.date.substring(2).split('-');
    const dataId = workloadModule.workerIndex + '_' + i;

    const keys = [ENV.assetType, ENV.orgName, ...keysDate, dataId];

    const request = {
      contractId: ENV.contractId,
      contractFunction: 'deleteAsset',
      contractArguments: [ENV.assetType, JSON.stringify(keys)],
      readOnly: false
    };

    sendRequests.push(workloadModule.sutAdapter.sendRequests(request));
  }

  const onSuccessMessage = `Worker ${workloadModule.workerIndex}: ${ENV.nAsset} asset(s) are deleted`;
  return Promise.all(sendRequests).then(() => console.log(onSuccessMessage));
}


exports.iwmCreateAssets = iwmCreateAssets;
exports.deleteIwmCreatedAssets = deleteIwmCreatedAssets;