const mongoose = require('mongoose');

const friendSchema = mongoose.Schema(
  {
    name: String,
    x: Number,
    y: Number,
    totalSales: Number,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }],
  },
  {
    timestamps: {
      createdAt: 'created_time',
      updatedAt: 'updated_time',
    },
  }
);

module.exports = mongoose.model('Friend', friendSchema);
