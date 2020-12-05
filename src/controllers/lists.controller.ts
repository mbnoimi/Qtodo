import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {Lists} from '../models';
import {ListsRepository} from '../repositories';

export class ListsController {
  constructor(
    @repository(ListsRepository)
    public listsRepository: ListsRepository,
  ) { }

  @post('/lists', {
    responses: {
      '200': {
        description: 'Lists model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lists)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lists, {
            title: 'NewLists',
            exclude: ['id'],
          }),
        },
      },
    })
    lists: Omit<Lists, 'id'>,
  ): Promise<Lists> {
    return this.listsRepository.create(lists);
  }

  @get('/lists/count', {
    responses: {
      '200': {
        description: 'Lists model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Lists) where?: Where<Lists>,
  ): Promise<Count> {
    return this.listsRepository.count(where);
  }

  @get('/lists', {
    responses: {
      '200': {
        description: 'Array of Lists model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Lists, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Lists) filter?: Filter<Lists>,
  ): Promise<Lists[]> {
    return this.listsRepository.find(filter);
  }

  @patch('/lists', {
    responses: {
      '200': {
        description: 'Lists PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lists, {partial: true}),
        },
      },
    })
    lists: Lists,
    @param.where(Lists) where?: Where<Lists>,
  ): Promise<Count> {
    return this.listsRepository.updateAll(lists, where);
  }

  @get('/lists/{id}', {
    responses: {
      '200': {
        description: 'Lists model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lists, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lists, {exclude: 'where'}) filter?: FilterExcludingWhere<Lists>
  ): Promise<Lists> {
    return this.listsRepository.findById(id, filter);
  }

  @patch('/lists/{id}', {
    responses: {
      '204': {
        description: 'Lists PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lists, {partial: true}),
        },
      },
    })
    lists: Lists,
  ): Promise<void> {
    await this.listsRepository.updateById(id, lists);
  }

  @put('/lists/{id}', {
    responses: {
      '204': {
        description: 'Lists PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lists: Lists,
  ): Promise<void> {
    await this.listsRepository.replaceById(id, lists);
  }

  @del('/lists/{id}', {
    responses: {
      '204': {
        description: 'Lists DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.listsRepository.deleteById(id);
  }

  // FIXME: This endpoint doesn't work!
  // https://loopbackio.slack.com/archives/C01177XQN8N/p1607170208092200

  // @get('/lists/{color}', {
  @get('/list/{color}', {
    responses: {
      '200': {
        description: 'Query all lists by color',
      },
    },
  })
  async getListByColor(@param.path.string('color') color: number): Promise<any> {
    //TODO: Learn how to add better query using ORM or Query Builder
    // return this.listsRepository.dataSource.execute("SELECT * FROM public.lists as li WHERE li.color = " + color);
    return this.listsRepository.findByColor(color);
  }
}
