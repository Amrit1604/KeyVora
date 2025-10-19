const fs = require('fs');
const path = require('path');

const padsFilePath = path.join(__dirname, '../../data/pads.json');

class PadModel {
  constructor(id, encrypted_blob, metadata) {
    this.id = id;
    this.encrypted_blob = encrypted_blob;
    this.metadata = metadata;
  }

  static async getAllPads() {
    const padsData = await PadModel.readPadsFromFile();
    return padsData;
  }

  static async getPadById(id) {
    const padsData = await PadModel.readPadsFromFile();
    return padsData.find(pad => pad.id === id);
  }

  static async createPad(pad) {
    const padsData = await PadModel.readPadsFromFile();
    padsData.push(pad);
    await PadModel.writePadsToFile(padsData);
  }

  static async updatePad(id, updatedPad) {
    const padsData = await PadModel.readPadsFromFile();
    const padIndex = padsData.findIndex(pad => pad.id === id);
    if (padIndex !== -1) {
      padsData[padIndex] = updatedPad;
      await PadModel.writePadsToFile(padsData);
    }
  }

  static async readPadsFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(padsFilePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }

  static async writePadsToFile(padsData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(padsFilePath, JSON.stringify(padsData, null, 2), 'utf8', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = PadModel;