import * as svc from '../services/jsonplaceholder.service.js';

export async function getUsers(req, res, next) {
  try {
    const users = await svc.listUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await svc.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

export async function postUser(req, res, next) {
  try {
    const { name, email, phone } = req.body ?? {};
    if (!name || !email) {
      return res.status(400).json({ error: 'name y email son obligatorios' });
    }
    const created = await svc.createUser({ name, email, phone });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}
