'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets } = require('./helper');

const ENV = require('../env.json');
const BATCH_SAMPLE = require('./batchSample.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    await iwmCreateAssets(this);
  }

  async submitTransaction() {
  }

  async cleanupWorkloadModule() {
    // const monthYearKeys = ENV.date.substring(2).slice(0, -3).split('-');
    // const keys = [ENV.assetType, ENV.orgName, ...monthYearKeys];
    // const keysJsonString = JSON.stringify(keys);

    // const myArgs = {
    //   contractId: ENV.contractId,
    //   contractFunction: 'readAssets',
    //   contractArguments: [ENV.assetType, keysJsonString],
    //   readOnly: true
    // };

    // const result = await this.sutAdapter.sendRequests(myArgs);

    // console.log(result);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;