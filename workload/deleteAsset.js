'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { iwmCreateAssets, deleteIwmCreatedAssets } = require('./helper');

const ENV = require('../env.json');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
    await iwmCreateAssets(this);
  }

  async submitTransaction() {
    const keysDate = ENV.date.substring(2).split('-');
    const randomId = Math.floor(Math.random() * ENV.nAsset);
    const dataId = this.workerIndex + '_' + randomId;

    const keys = [ENV.assetType, ENV.orgName, ...keysDate, dataId];

    const request = {
      contractId: ENV.contractId,
      contractFunction: 'deleteAsset',
      contractArguments: [ENV.assetType, JSON.stringify(keys)],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(request);
  }

  async cleanupWorkloadModule() {
    await deleteIwmCreatedAssets(this);
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;