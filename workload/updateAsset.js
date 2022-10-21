'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, clearLedger, sleep } = require('./helper');

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
    await iwmCreateAssets(this);
    await sleep(10, this);
  }

  async submitTransaction() {
    const keysDate = ENV.date.substring(2).split('-');
    
    const keys = [ENV.orgName, this.workerIndex.toString(), ...keysDate, this.currentId.toString()];
    
    const data = { ...BATCH_SAMPLE };
    data.id = this.currentId;
    data.date = ENV.date;

    this.currentId++

    if (this.currentId > ENV.nAsset) {
      this.currentId = 0
    }
    
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
    await sleep(10, this);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;