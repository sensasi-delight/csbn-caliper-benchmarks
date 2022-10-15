const ARGUMENTS = require('../benchmarks/arguments.json');
const BATCH_SAMPLE = require('./batchSample.json');


export const iwmCreateAssets = async (workloadModule) => {
  console.log(`Worker ${workloadModule.workerIndex}: Creating ${ARGUMENTS.nAsset} asset(s)`);

  const sendRequests = [];

  for (let i = 0; i < ARGUMENTS.nAsset; i++) {

    let data = { ...BATCH_SAMPLE };
    data.id = workloadModule.workerIndex + '_' + i;
    data.date = ARGUMENTS.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, data.id];

    const request = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['create', ARGUMENTS.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    sendRequests.push(workloadModule.sutAdapter.sendRequests(request));
  }

  const onSuccessMessage = `Worker ${workloadModule.workerIndex}: ${ARGUMENTS.nAsset} asset(s) are created`;

  return Promise.all(sendRequests).then(() => console.log(onSuccessMessage));
}

export const deleteIwmCreatedAssets = async (workloadModule) => {
  console.log(`Worker ${workloadModule.workerIndex}: Deleting ${ARGUMENTS.nAsset} asset(s)`);

  const sendRequests = [];

  for (let i = 0; i < ARGUMENTS.nAsset; i++) {

    const keysDate = ARGUMENTS.date.substring(2).split('-');
    const dataId = workloadModule.workerIndex + '_' + i;

    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, dataId];

    const request = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'deleteAsset',
      contractArguments: [ARGUMENTS.assetType, JSON.stringify(keys)],
      readOnly: false
    };

    sendRequests.push(workloadModule.sutAdapter.sendRequests(request));
  }

  const onSuccessMessage = `Worker ${workloadModule.workerIndex}: ${ARGUMENTS.nAsset} asset(s) are deleted`;
  return Promise.all(sendRequests).then(() => console.log(onSuccessMessage));
}