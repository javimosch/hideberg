var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    name: 'emails',
    def: {
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    configure: schema => schema
};
