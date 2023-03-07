import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Demomodel extends Entity {
  @property({
    type: 'string',
    generated: true,
    id: true
  })
  Id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  exist: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(data?: Partial<Demomodel>) {
    super(data);
  }
}

export interface DemomodelRelations {
  // describe navigational properties here
}

export type DemomodelWithRelations = Demomodel & DemomodelRelations;
