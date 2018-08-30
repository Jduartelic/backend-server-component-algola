
const { moment } = require("./configInitMoment.js");

const getMomentConfEnv = (date, format) => {
    return moment(date).format(format);
  };

module.exports = {
    moment,
    getMomentConfEnv
  };
  