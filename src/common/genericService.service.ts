import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class GenericService<ENTITY, ID, DTO, PARTIAL_DTO> {
  private readonly genericRepository: Repository<ENTITY>;

  constructor(genericRepository: Repository<ENTITY>) {
    this.genericRepository = genericRepository;
  }

  async create(data: DTO): Promise<ENTITY> {
    const newItem = this.genericRepository.create(data);
    await this.genericRepository.save(newItem);
    return newItem;
  }

  async update(id: ID, data: PARTIAL_DTO): Promise<ENTITY> {
    const item = await this.genericRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`The resource with id ${id} not found`);
    }
    return this.genericRepository.merge(item, data);
  }

  async delete(id: ID): Promise<boolean> {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundException(`The resource with id ${id} not found`);
    }

    await this.genericRepository.delete(id);

    return true;
  }

  async findAll(): Promise<ENTITY[]> {
    return this.genericRepository.find();
  }

  async findOne(id: ID): Promise<ENTITY> {
    const item = await this.genericRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`The resource with id ${id} not found`);
    }
    return item;
  }
}
