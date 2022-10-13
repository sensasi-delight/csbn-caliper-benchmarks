'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const BATCH_SAMPLE = require('./batchSample.json');
const ARGUMENTS = require('../benchmarks/arguments.json');

class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    for (let i = 0; i < ARGUMENTS.nAsset; i++) {

      let data = { ...BATCH_SAMPLE };
      data.id = this.workerIndex + '_' + i;
      data.date = ARGUMENTS.date;

      const keysDate = data.date.substring(2).split('-');

      const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, data.id];

      console.log(`Worker ${this.workerIndex}: Creating asset ${keys.toString()}`);

      const request = {
        contractId: ARGUMENTS.contractId,
        contractFunction: 'createOrUpdateAsset',
        invokerIdentity: 'User1',
        contractArguments: ['create', ARGUMENTS.assetType, JSON.stringify(keys), JSON.stringify(data)],
        readOnly: false
      };

      await this.sutAdapter.sendRequests(request);
    }
  }

  async submitTransaction() {
    const keysDate = ARGUMENTS.date.substring(2).split('-');
    const randomId = Math.floor(Math.random() * ARGUMENTS.nAsset);
    const dataId = this.workerIndex + '_' + randomId;

    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, dataId];

    const myArgs = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'readAsset',
      invokerIdentity: 'User1',
      contractArguments: [ARGUMENTS.assetType, JSON.stringify(keys)],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    console.log(`Worker ${this.workerIndex}: Deleting ${ARGUMENTS.nAsset} asset(s)`);

    const sendRequests = [];

    for (let i = 0; i < ARGUMENTS.nAsset; i++) {

      const keysDate = ARGUMENTS.date.substring(2).split('-');
      const dataId = this.workerIndex + '_' + i;

      const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, dataId];

      const request = {
        contractId: ARGUMENTS.contractId,
        contractFunction: 'deleteAsset',
        invokerIdentity: 'User1',
        contractArguments: [ARGUMENTS.assetType, JSON.stringify(keys)],
        readOnly: false
      };

      sendRequests.push(this.sutAdapter.sendRequests(request));
    }

    await Promise.all(sendRequests);
    console.log(`Worker ${this.workerIndex}: ${ARGUMENTS.nAsset} asset(s) are deleted`);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;