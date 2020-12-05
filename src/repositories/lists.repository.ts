import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Lists, ListsRelations, Todos} from '../models';
import {TodosRepository} from './todos.repository';

export class ListsRepository extends DefaultCrudRepository<
  Lists,
  typeof Lists.prototype.id,
  ListsRelations
  > {

  public readonly todos: HasManyRepositoryFactory<Todos, typeof Lists.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('TodosRepository') protected todosRepositoryGetter: Getter<TodosRepository>,
  ) {
    super(Lists, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todosRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}

//TODO: Learn how to add code right here for customized queries
