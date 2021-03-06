import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { FileDataDto } from './dtos/file-data.dto';
import { MetadataDto } from './dtos/metadata.dto';
import { FileData } from './schemas/file-data.interface';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { createReadStream } from 'fs';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';

const DB_PATH = '../db/db.json';

// ropsten  0xE6b9B462EEB34E8a6AfB5e48e1a559B74efcb185
// https://ropsten.etherscan.io/address/0xE6b9B462EEB34E8a6AfB5e48e1a559B74efcb185
@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;
  ipfsClient: IPFSHTTPClient;

  constructor() {
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));
    this.ipfsClient = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
    });
    const data = this.db.getData('/');
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;
  }

  getAll() {
    return this.db.getData('/');
  }

  isIpfsNodeOnline() {
    return this.ipfsClient.isOnline();
  }

  pushFile(file: FileDataDto) {
    const obj = new FileData(file);
    const fileId = ++this.lastId;
    this.db.push(`/${fileId}`, obj);
  }

  setMetadata(fileId: number, metadata: MetadataDto) {
    let file: any;
    try {
      file = this.db.getData(`/${fileId}/file`);
    } catch (error) {
      return { error };
    }
    if (!file) return false;
    this.db.push(`/${fileId}/metadata`, metadata);
    return this.get(fileId);
  }

  get(fileId: number) {
    return this.db.getData(`/${fileId}`);
  }

  getMetadata(fileId: number) {
    return this.db.getData(`/${fileId}/metadata`);
  }

  getFileStream(filename: string) {
    const fileStream = createReadStream(`../upload/${filename}`);
    return new StreamableFile(fileStream);
  }

  async saveToIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    const fileLocation = `../upload/${fileData.file.storageName}`;
    const fileBytes = fs.readFileSync(fileLocation);
    const ipfsData = await this.ipfsClient.add(fileBytes);
    this.db.push(`/${fileId}/ipfs`, ipfsData);
    return this.get(fileId);
  }

  async getFromIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    if (!fileData.ipfs || !fileData.ipfs.path || fileData.ipfs.path.length == 0)
      throw new Error('File not found');
    const ipfsBytes = this.ipfsClient.cat(fileData.ipfs.path);
    const content = [];
    for await (const chunk of ipfsBytes) {
      content.push(chunk);
    }
    const fileStream = uint8ArrayConcat(content);
    return new StreamableFile(fileStream);
  }
}
