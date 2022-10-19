'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, clearLedger } = require('./helper');

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
    await iwmCreateAssets(this);
    await sleep(10);
  }

  async submitTransaction() {
    
    const keysDate = ENV.date.substring(2).split('-');
    
    const randomId = Math.floor(Math.random() * ENV.nAsset);
    
    
    const keys = [ENV.orgName, ...keysDate, this.workerIndex, randomId];

    const data = { ...BATCH_SAMPLE };
    data.id = dataId;
    data.date = ENV.date;

    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'createOrUpdateAsset',
      contractArguments: ['update', ENV.assetType, JSON.stringify(keys), JSON.stringify(data)],
      readOnly: false
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    await clearLedger(this);
    await sleep(10);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;