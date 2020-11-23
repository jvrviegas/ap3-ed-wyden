import Sequelize, { Model } from 'sequelize';

class Queue extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: Sequelize.STRING,
        expiring_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Queue;
