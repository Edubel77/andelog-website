
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../services/users.service.js';

export const getAll = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
};

export const get = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }
    const created = await createUser({ name, email, password, created_at: new Date(), updated_at: new Date() });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};
    const updated = await updateUser(req.params.id, { name, email, password, updated_at: new Date() });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
