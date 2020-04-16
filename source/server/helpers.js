const moment = require('moment')

const helpers = {

	timeAgo: function (timestamp) {
		return moment(timestamp).startOf('minute').fromNow()
	}
}

module.exports = helpers