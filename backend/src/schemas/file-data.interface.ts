import { FileDataDto } from '../dtos/file-data.dto';
import { IpfsDataDto } from '../dtos/ipfs-data.dto';
import { MetadataDto } from '../dtos/metadata.dto';

export class FileData {
  constructor(
    public file?: FileDataDto,
    public metadata?: MetadataDto,
    public ipfs?: IpfsDataDto,
  ) {}
}
