'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, clearLedger, sleep } = require('./helper');

const ENV = require('../env.json');


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
    const monthYearKeys = ENV.date.substring(2).slice(0, -3).split('-');
    const keys = [ENV.orgName, ...monthYearKeys, this.workerIndex];
    const keysJsonString = JSON.stringify(keys);

    const myArgs = {
      contractId: ENV.contractId,
      contractFunction: 'readAssets',
      contractArguments: [ENV.assetType, keysJsonString],
      readOnly: true
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