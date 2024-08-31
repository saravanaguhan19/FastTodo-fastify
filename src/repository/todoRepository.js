const fastifyPlugin = require("fastify-plugin");

class TodoRepository {
  constructor(db) {
    this.db = db;
  }

  async create(todoText) {
    const todoList = this.db.todos;

    this.db.todos.push({
      text: todoText,
      id: todoList.length,
    });

    return this.db.todos;
  }

  async getAll() {
    return this.db.todos;
  }

  async getOne(id) {
    const todo = this.db.todos.find((todo) => todo.id == id);
    console.log(todo);

    return todo;
  }

  async deleteOne(id) {
    return this.db.todos.filter((todo) => todo.id != id);
  }

  async deleteAll() {}
}

async function todoRepository(fastify, options) {
  const { db } = fastify;

  const repo = new TodoRepository(db);

  fastify.decorate("todoRepository", repo);
}

module.exports = fastifyPlugin(todoRepository);
