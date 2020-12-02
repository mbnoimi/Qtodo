import {DefaultCrudRepository} from '@loopback/repository';
import {Lists, ListsRelations} from '../models';
import {PostgresqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ListsRepository extends DefaultCrudRepository<
  Lists,
  typeof Lists.prototype.id,
  ListsRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(Lists, dataSource);
  }
}
