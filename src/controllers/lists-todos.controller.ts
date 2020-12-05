import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Lists,
  Todos,
} from '../models';
import {ListsRepository} from '../repositories';

export class ListsTodosController {
  constructor(
    @repository(ListsRepository) protected listsRepository: ListsRepository,
  ) { }

  @get('/lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Array of Lists has many Todos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Todos>,
  ): Promise<Todos[]> {
    return this.listsRepository.todos(id).find(filter);
  }

  @post('/lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Lists model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lists.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {
            title: 'NewTodosInLists',
            exclude: ['id'],
            optional: ['list_id']
          }),
        },
      },
    }) todos: Omit<Todos, 'id'>,
  ): Promise<Todos> {
    return this.listsRepository.todos(id).create(todos);
  }

  @patch('/lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Lists.Todos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {partial: true}),
        },
      },
    })
    todos: Partial<Todos>,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.listsRepository.todos(id).patch(todos, where);
  }

  @del('/lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Lists.Todos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.listsRepository.todos(id).delete(where);
  }
}
