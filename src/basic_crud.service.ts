import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';


export class BasicCrudService {
  constructor(
    private repository: Repository<any>,
  ) {}

  async create(objectDTO:any){
    let object = await this.repository.create(objectDTO);
    await this.repository.save(object);
    return object;
  }

  async findAll(relations=[]):Promise<Array<any> | undefined> {
    let objects = await this.repository.find({relations: relations});
    if(objects.length === 0){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return objects;
  }

  async update(objectDTO: any,relations=[]) {
    let object = await this.repository.findOne({where:{id:objectDTO.id}, relations: relations});
    if(!object){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return await this.repository.update(objectDTO.id, objectDTO);
  }

  async findOne(id: string,relations=[]): Promise<any | undefined> {
    let object = await this.repository.findOne({ where: { id },relations: relations });
    if(!object){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return object;
  }

  async findOneWithConditions(conditions: object,relations=[]): Promise<any | undefined> {
    let object = await this.repository.findOne({ where: conditions,relations: relations });
    if(!object){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return object;
  }

  async findSomeWithConditions(conditions: object,relations=[]): Promise<Array<any> | undefined> {
    let object = await this.repository.find({ where: conditions,relations: relations });
    if(!object){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return object;
  }

  async delete(id: string): Promise<any | undefined> {
    return await this.repository.delete(id);
  }

}