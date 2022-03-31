const mongoose = require('mongoose');

const schema = mongoose.Schema;

const task = new schema({
	header: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.model('Task', task);
