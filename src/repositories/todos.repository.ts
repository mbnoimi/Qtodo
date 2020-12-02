import {DefaultCrudRepository} from '@loopback/repository';
import {Todos, TodosRelations} from '../models';
import {PostgresqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodosRepository extends DefaultCrudRepository<
  Todos,
  typeof Todos.prototype.id,
  TodosRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(Todos, dataSource);
  }
}
