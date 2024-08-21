const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    client_ip: {
        type: String,
        required: true
    },
    list: [{
        title: {
            type: String,
            required: true,
            unique: true
        },
        task_date: {
            type: Date,
            required: true,
            default: Date.now
        },
        priority: {
            type: Number,
            required: true,
            default: 0
        },
        task_status: {
            type: Number,
            required: true,
            default: 0
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
