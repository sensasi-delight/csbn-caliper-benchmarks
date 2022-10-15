'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, deleteIwmCreatedAssets } = require('./helper');

const ARGUMENTS = require('../benchmarks/arguments.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
    await iwmCreateAssets(this);
  }

  async submitTransaction() {
    const monthYearKeys = ARGUMENTS.date.substring(2).slice(0, -3).split('-');
    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...monthYearKeys];
    const keysJsonString = JSON.stringify(keys);

    const myArgs = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'readAssets',
      contractArguments: [ARGUMENTS.assetType, keysJsonString],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    await deleteIwmCreatedAssets(this);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;