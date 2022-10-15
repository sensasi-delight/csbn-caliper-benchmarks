'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();

    this.currentId = 0;
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
  }

  async submitTransaction() {
    const data = { ...BATCH_SAMPLE };

    data.id = this.workerIndex + '_' + this.currentId++;
    data.date = ENV.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ENV.assetType, ENV.orgName, ...keysDate, data.id];

    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['create', ENV.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    console.log(`Worker ${this.workerIndex}: Deleting ${this.currentId - 1} asset(s)`);

    const sendRequests = [];

    for (let i = 0; i < this.currentId; i++) {

      const keysDate = ENV.date.substring(2).split('-');
      const dataId = this.workerIndex + '_' + i;

      const keys = [ENV.assetType, ENV.orgName, ...keysDate, dataId];

      const request = {
        contractId: ENV.contractId,
        contractFunction: 'deleteAsset',
        contractArguments: [ENV.assetType, JSON.stringify(keys)],
        readOnly: false
      };

      sendRequests.push(this.sutAdapter.sendRequests(request));
    }

    await Promise.all(sendRequests);
    console.log(`Worker ${this.workerIndex}: ${this.currentId - 1} asset(s) are deleted`);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;