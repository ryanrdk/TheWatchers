module.exports = (sequelize, type) => {
  return sequelize.define('Colle', {
    Username: {
      type: type.STRING,
      required: true
    },
    User_id: {
      type: type.STRING,
      required: true
    },
    Campus: {
      type: type.STRING,
      required: true,
    },
    Final_mark: {
      type: type.INTEGER
    },
    Mark1: {
      type: type.INTEGER
    },
    Comment1: {
      type: type.STRING
    },
    Cheating: {
      type: type.STRING
    },
    Colle: {
      type: type.STRING
    }
  })
};
