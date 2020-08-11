module.exports = (sequelize, type) => {
  return sequelize.define('Day', {
    Username: {
      type: type.STRING,
      allowFalse: false
    },
    User_id: {
      type: type.STRING,
      allowFalse: false
    },
    Campus: {
      type: type.STRING,
      allowFalse: false
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
    Mark2: {
      type: type.INTEGER
    },
    Comment2: {
      type: type.STRING
    },
    Mark3: {
      type: type.INTEGER
    },
    Comment3: {
      type: type.STRING
    },
    Cheating: {
      type: type.STRING
    },
    Day: {
      type: type.STRING
    }
  })
}
