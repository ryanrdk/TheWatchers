module.exports = (sequelize, type) => {
  return sequelize.define('Bootcamper', {
    first_name: {
      type: type.STRING,
      required: true
    },
    last_name: {
      type: type.STRING,
      required: true
    },
    username: {
      type: type.STRING,
      required: true,
      unique: true
    },
    email: {
      type: type.STRING,
      required: true
    },
    campus: {
      type: type.STRING,
      required: true
    },
    gender: {
      type: type.STRING,
      required: true
    },
    ethnicity: {
      type: type.STRING,
      required: true
    },
    active: {
      type: type.STRING,
      required: true
    },
    selected: {
      type: type.STRING,
      required: true
    }
  })
};
