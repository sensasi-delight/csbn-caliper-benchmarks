'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const ARGUMENTS = require('../benchmarks/arguments.json');
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
    let data = { ...BATCH_SAMPLE };

    data.id = this.workerIndex + '_' + this.currentId++;
    data.date = ARGUMENTS.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, data.id];

    const myArgs = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['create', ARGUMENTS.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    console.log(`Worker ${this.workerIndex}: Deleting ${this.currentId - 1} asset(s)`);

    const sendRequests = [];

    for (let i = 0; i < this.currentId; i++) {

      const keysDate = ARGUMENTS.date.substring(2).split('-');
      const dataId = this.workerIndex + '_' + i;

      const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, dataId];

      const request = {
        contractId: ARGUMENTS.contractId,
        contractFunction: 'deleteAsset',
        contractArguments: [ARGUMENTS.assetType, JSON.stringify(keys)],
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