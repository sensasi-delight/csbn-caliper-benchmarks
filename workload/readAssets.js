'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
var BATCH_SAMPLE = require('./batchSample.json');

class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    for (let i = 0; i < this.roundArguments.nAsset; i++) {
      const keys = ['Batch', 'Supp2', '22', '07', '01', (this.workerIndex + '_' + i)];
      const data = {
        "id": this.workerIndex + '_' + i,
        "date": "2022-07-01",
        "ingredients": [],
        "invoices": [],
        "processes": [
          {
            "id": 1,
            "imgPaths": [
              "image/default/processes/1receiving.png"
            ],
            "name": "Penerimaan Ayam Hidup",
            "datetime": "2022-08-29T22:29",
            "createdAt": "2022-08-29T22:30:16+07:00",
            "note": null,
            "from": "PT. ABC",
            "qtyEstimated": 500,
            "nFail": 0
          },
          {
            "id": 2,
            "imgPaths": [
              "image/default/processes/2antemortem.png"
            ],
            "name": "Antemortem",
            "datetime": "2022-08-29T22:30",
            "createdAt": "2022-08-29T22:30:32+07:00",
            "note": null,
            "nFail": 10
          },
          {
            "id": 3,
            "imgPaths": [
              "image/default/processes/3hanging.png"
            ],
            "name": "Penggantungan",
            "datetime": "2022-08-29T22:31",
            "createdAt": "2022-08-29T22:31:18+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 4,
            "imgPaths": [
              "image/default/processes/4stun.png"
            ],
            "name": "Pemingsanan",
            "watt": 15,
            "minuteDuration": 3,
            "datetime": "2022-08-29T22:32",
            "createdAt": "2022-08-29T22:33:30+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 5,
            "imgPaths": [
              "image/default/processes/5slaugthering.png"
            ],
            "name": "Penyembelihan Halal",
            "knifeInfo": "pribadi + tajam",
            "datetime": "2022-08-29T22:33",
            "createdAt": "2022-08-29T22:34:13+07:00",
            "note": null,
            "slaughterers": [
              {
                "id": "001",
                "name": "Adi Nugraha",
                "imgPath": "image/2022/8/add591f49ce0153f4ced47867d8dc0ed.jpg",
                "certificateNo": "123123123",
                "certificateImgPath": "image/2022/8/5cca5b28abc47547f97818aecc12fdec.jpg"
              },
              {
                "id": "004",
                "name": "Rafi Shidiq",
                "imgPath": "image/2022/8/969f112548bd0e8c922ac0bd2e90d122.jpg",
                "certificateNo": "123123123",
                "certificateImgPath": "image/2022/8/8c77ca2dceb16a98bdc0195f1ec4ffce.jpg"
              }
            ],
            "nFail": 0
          },
          {
            "id": 6,
            "imgPaths": [
              "image/default/processes/6bleeding.png"
            ],
            "name": "Penirisan Darah",
            "minuteDuration": 5,
            "datetime": "2022-08-29T22:34",
            "createdAt": "2022-08-29T22:34:30+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 7,
            "imgPaths": [
              "image/default/processes/7scalding.png"
            ],
            "name": "Perendaman Dengan Air Mendidih",
            "datetime": "2022-08-29T22:34",
            "temperature": "90",
            "createdAt": "2022-08-29T22:34:49+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 8,
            "imgPaths": [
              "image/default/processes/8defeathering.png"
            ],
            "name": "Pencabutan Bulu",
            "datetime": "2022-08-29T22:35",
            "createdAt": "2022-08-29T22:35:10+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 9,
            "imgPaths": [
              "image/default/processes/9head.png"
            ],
            "name": "Pemotongan Leher dan Kepala",
            "datetime": "2022-08-29T22:35",
            "createdAt": "2022-08-29T22:35:30+07:00",
            "note": null,
            "nFail": 0
          },
          {
            "id": 10,
            "imgPaths": [
              "image/default/processes/10evis.png"
            ],
            "name": "Evisceration & Pemotongan Ceker",
            "note": null,
            "createdAt": "2022-08-29T22:35:48+07:00",
            "datetime": "2022-08-29T22:35",
            "nFail": 0
          },
          {
            "id": 11,
            "imgPaths": [
              "image/default/processes/11scalding.png"
            ],
            "name": "Chilling",
            "note": null,
            "createdAt": "2022-08-29T22:37:17+07:00",
            "datetime": "2022-08-29T22:37",
            "nFail": 0
          },
          {
            "id": 12,
            "imgPaths": [
              "image/default/processes/12grading.png"
            ],
            "name": "Grading",
            "datetime": "2022-08-29T22:38",
            "createdAt": "2022-08-29T22:38:34+07:00",
            "note": "ditemukan memar saat grading",
            "nFail": 10
          },
          {
            "id": 13,
            "imgPaths": [
              "image/default/processes/13packing1.png"
            ],
            "name": "Pengemasan",
            "datetime": "2022-08-29T22:50",
            "createdAt": "2022-08-29T22:51:02+07:00",
            "note": null,
            "nFail": 10,
            "nPack": null,
            "products": [
              {
                "id": "001",
                "name": "Karkas Utuh",
                "imgPath": "image/2022/8/86ddb0300fff3b8fb070ab818a4f49a2.png",
                "ingredients": [],
                "halalCertificateId": "",
                "pcsPerChicken": 1,
                "nPack": 470
              },
              {
                "id": "008",
                "name": "Ceker Ayam",
                "imgPath": "image/2022/8/80c8f01731edc5ab3e72d5837a4229c7.png",
                "ingredients": [],
                "halalCertificateId": "",
                "pcsPerChicken": 2,
                "nPack": 20
              },
              {
                "id": "009",
                "name": "Kepala Leher",
                "imgPath": "image/2022/8/6a6205e4cc8dd4a49858d974e035731d.png",
                "ingredients": [],
                "halalCertificateId": "",
                "pcsPerChicken": 1,
                "nPack": 20
              },
              {
                "id": "010",
                "name": "Hati Jantung Ampela",
                "imgPath": "image/2022/8/91925b0e5cf9196fd245bf54a0181009.png",
                "ingredients": [],
                "halalCertificateId": "",
                "pcsPerChicken": 1,
                "nPack": 20
              }
            ]
          },
          {
            "id": 14,
            "imgPaths": [
              "image/default/processes/14storing.png"
            ],
            "name": "Penyimpanan",
            "datetime": "2022-08-29T22:53",
            "storeAt": "Warehouse A",
            "nPackFails": [
              {
                "productId": "001",
                "nPackFail": 10
              },
              {
                "productId": "008",
                "nPackFail": 10
              },
              {
                "productId": "009",
                "nPackFail": 10
              },
              {
                "productId": "010",
                "nPackFail": 10
              }
            ],
            "note": "terindikasi terjadi pembusukan",
            "createdAt": "2022-08-29T22:56:14+07:00"
          }
        ]

      }
      console.log(`Worker ${this.workerIndex}: Creating asset ${keys.toString()}`);
      const request = {
        contractId: this.roundArguments.contractId,
        contractFunction: 'createOrUpdateAsset',
        invokerIdentity: 'User1',
        contractArguments: ['create', 'Batch', JSON.stringify(keys), JSON.stringify(data)],
        readOnly: false
      };

      await this.sutAdapter.sendRequests(request);
    }
  }

  async submitTransaction() {
    const keys = ['Batch', 'Supp2', '22', '07'];
    const myArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: 'readAssets',
      invokerIdentity: 'User1',
      contractArguments: ['Batch', JSON.stringify(keys)],
      readOnly: true
    };

    await this.sutAdapter.sendRequests(myArgs);
  }

  async cleanupWorkloadModule() {
    for (let i = 0; i < this.roundArguments.nAsset; i++) {
      const keys = ['Batch', 'Supp2', '22', '07', '01', (this.workerIndex + '_' + i)];
      console.log(`Worker ${this.workerIndex}: Deleting asset ${keys.toString()}`);
      const request = {
        contractId: this.roundArguments.contractId,
        contractFunction: 'deleteAsset',
        invokerIdentity: 'User1',
        contractArguments: ['Batch', JSON.stringify(keys)],
        readOnly: false
      };

      await this.sutAdapter.sendRequests(request);
    }
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;