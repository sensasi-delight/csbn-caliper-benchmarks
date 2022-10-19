'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { clearLedger } = require('./helper');

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();

    this.currentId = 0;
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    await clearLedger(this);
  }

  async submitTransaction() {
    const data = { ...BATCH_SAMPLE };

    data.id = this.workerIndex + '_' + this.currentId++;
    data.date = ENV.date;

    const keysDate = data.date.substring(2).split('-');

    const keys = [ENV.orgName, ...keysDate, this.workerIndex, data.id];

    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['create', ENV.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    await clearLedger(this);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;