'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const ARGUMENTS = require('../benchmarks/arguments.json');

class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
  }

  async submitTransaction() {
    const myArgs = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'reach',
      invokerIdentity: 'User1',
      contractArguments: [],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
  }
}



function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;