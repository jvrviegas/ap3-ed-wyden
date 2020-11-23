import Queue from '../models/Queue';

class QueueController {
  async index(req, res) {
    const queue = await Queue.findAll();

    return res.status(200).json(queue);
  }

  async show(req, res) {
    return res.status(400).json({ error: 'Por favor informe o usuário' });
  }

  async store(req, res) {
    const { product_id, expiring_date } = req.body;

    if (!product_id && !expiring_date) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const queue = await Queue.create({
      product_id,
      expiring_date,
    });

    if (!queue) {
      return res.status(400).json(false);
    }

    return res.status(201).json(queue);
  }

  async update(req, res) {
    return res.status(200).json(true);
  }
}

export default new QueueController();
