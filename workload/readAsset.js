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
    const keysDate = ARGUMENTS.date.substring(2).split('-');
    const randomId = Math.floor(Math.random() * ARGUMENTS.nAsset);
    const dataId = this.workerIndex + '_' + randomId;

    const keys = [ARGUMENTS.assetType, ARGUMENTS.orgName, ...keysDate, dataId];

    const myArgs = {
      contractId: ARGUMENTS.contractId,
      contractFunction: 'readAsset',
      contractArguments: [ARGUMENTS.assetType, JSON.stringify(keys)],
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