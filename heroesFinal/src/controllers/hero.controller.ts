import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Character, Planet, Species} from '../models';
import {CharacterRepository} from '../repositories';

export class HeroController {
  constructor(
    @repository(CharacterRepository)
    public characterRepository : CharacterRepository,
  ) {}

  @post('/heroes', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async create(@requestBody() character: Character): Promise<Character> {
    return await this.characterRepository.create(character);
  }

  @get('/heroes/count', {
    responses: {
      '200': {
        description: 'Character model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Character)) where?: Where,
  ): Promise<Count> {
    return await this.characterRepository.count(where);
  }

  @get('/heroes', {
    responses: {
      '200': {
        description: 'Array of Character model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Character}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Character)) filter?: Filter,
  ): Promise<Character[]> {
    return await this.characterRepository.find(filter);
  }

  @patch('/heroes', {
    responses: {
      '200': {
        description: 'Character PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() character: Character,
    @param.query.object('where', getWhereSchemaFor(Character)) where?: Where,
  ): Promise<Count> {
    return await this.characterRepository.updateAll(character, where);
  }

  @get('/heroes/{id}', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Character> {
    return await this.characterRepository.findById(id);
  }

  @patch('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Character PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() character: Character,
  ): Promise<void> {
    await this.characterRepository.updateById(id, character);
  }

  @del('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Character DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.characterRepository.deleteById(id);
  }

  @get('/heroes/{id}/friend', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async getFriend(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Character> {
    return await this.characterRepository.friend(heroId);
  }

  @get('/heroes/{id}/planet', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Planet}}},
      },
    },
  })
  async getPlanet(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Planet> {
    return await this.characterRepository.planet(heroId);
  }

  @get('/heroes/{id}/species', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Species}}},
      },
    },
  })
  async getSpecies(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Species> {
    return await this.characterRepository.species(heroId);
  }
}
