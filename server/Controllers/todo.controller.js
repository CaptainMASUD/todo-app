import Todo from '../models/todo.model.js';

export const createTodo = async (req, res) => {
  const { course, title, description, dueDate, section, type } = req.body;
  try {
    const todo = await Todo.create({ course, title, description, dueDate, section, type });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate('course');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
