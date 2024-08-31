const fastifyPlugin = require("fastify-plugin");

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async create(todoText) {
    return this.todoRepository.create(todoText);
  }

  async getAll() {
    return this.todoRepository.getAll();
  }

  async getOne(id) {
    return this.todoRepository.getOne(id);
  }

  async deleteOne(id) {
    return this.todoRepository.deleteOne(id);
  }

  async deleteAll() {
    return this.todoRepository.deleteAll();
  }
}

async function todoService(fastify, options) {
  const { todoRepository } = fastify;

  const service = new TodoService(todoRepository);

  fastify.decorate("todoService", service);
}

module.exports = fastifyPlugin(todoService);
