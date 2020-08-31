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

  async findAll(relations=[]){
    let users = await this.repository.find({relations: relations});
    return users;
  }

  async update(objectDTO: any,relations=[]) {
    let object = await this.repository.findOne({where:{id:objectDTO.id}, relations: relations});
    if(!object){
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return await this.repository.update(objectDTO.id, objectDTO);
  }

  async findOne(id: string,relations=[]): Promise<any | undefined> {
    return await this.repository.findOne({ where: { id },relations: relations });
  }

  async delete(id: string): Promise<any | undefined> {
    return await this.repository.delete(id);
  }

}