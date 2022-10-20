'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, clearLedger, sleep, cwmDeleteAssets } = require('./helper');

const ENV = require('../env.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    await clearLedger(this);
    await iwmCreateAssets(this);
    await sleep(10, this);
  }

  async submitTransaction() {
    const keysDate = ENV.date.substring(2).split('-');
    const randomId = Math.floor(Math.random() * ENV.nAsset);
    

    const keys = [ENV.orgName, ...keysDate, this.workerIndex.toString(), randomId.toString()];

    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'readAsset',
      contractArguments: [ENV.assetType, JSON.stringify(keys)],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    await cwmDeleteAssets(this);
    await sleep(10, this);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;