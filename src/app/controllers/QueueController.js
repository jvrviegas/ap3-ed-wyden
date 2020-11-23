import { Op } from 'sequelize';
import Queue from '../models/Queue';
import Product from '../models/Product';

class QueueController {
  async index(req, res) {
    const today = new Date();

    const queue = await Queue.findAll({
      where: {
        expiring_date: {
          [Op.gte]: today,
        },
      },
      order: [['expiring_date', 'asc']],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'expiring_date'],
        },
      ],
    });

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

  async delete(req, res) {
    const queue = await Queue.findOne({
      where: { product_id: req.params.id },
    });

    if (!queue) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await queue.destroy();

    return res.status(200).json({ message: 'Produto removido com sucesso' });
  }
}

export default new QueueController();
