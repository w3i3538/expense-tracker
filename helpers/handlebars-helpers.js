const dayjs = require('dayjs')

module.exports = {

  eq: function (a, b) {
    return a === b
  },
  dateNoTime: function (date) {
    return dayjs(date).format('YYYY年MM月DD日');
  },
}
