import {Entity, hasMany, model, property} from '@loopback/repository';
import {Todos} from './todos.model';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'lists'}}})
export class Lists extends Entity {
  @property({
    type: 'string',
    // required: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'title', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  title: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'desc', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  desc?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'color', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  color?: number;

  //TODO: Modify this property then activate auto-update
  // @property({
  //   type: 'string',
  //   scale: 0,
  //   postgresql: {columnName: 'color', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  // })
  // color?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'status', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  status: number;

  @hasMany(() => Todos, {keyTo: 'list_id'})
  todos: Todos[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Lists>) {
    super(data);
  }
}

export interface ListsRelations {
  // describe navigational properties here
}

export type ListsWithRelations = Lists & ListsRelations;
