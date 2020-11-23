import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      order: [['id', 'asc']],
    });

    return res.status(200).json(products);
  }

  async show(req, res) {
    return res.status(400).json({ error: 'Por favor informe o usuário' });
  }

  async store(req, res) {
    const { name, expiring_date, lote } = req.body;

    if (!name && !expiring_date && !lote) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const product = await Product.create({
      name,
      expiring_date,
      lote,
    });

    if (!product) {
      return res.status(400).json(false);
    }

    return res.status(200).json(product);
  }

  async update(req, res) {
    return res.status(200).json(true);
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();

    return res.status(200).json({ message: 'Produto excluído com sucesso' });
  }
}

export default new ProductController();
