module.exports = (sequelize, type) => {
  return sequelize.define('Exam', {
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
    Exam: {
      type: type.STRING
    }
  })
};
