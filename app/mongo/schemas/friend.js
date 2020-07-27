const mongoose = require('mongoose');

const friendSchema = mongoose.Schema(
  {
    name: String,
    x: Number,
    y: Number,
    totalSales: Number,
    isChild: { type: Boolean, default: false },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }],
  },
  {
    timestamps: {
      createdAt: 'created_time',
      updatedAt: 'updated_time',
    },
  }
);

function autoPopulateSubs(next) {
  this.populate('children');
  next();
}

friendSchema.pre('findOne', autoPopulateSubs).pre('find', autoPopulateSubs);

module.exports = mongoose.model('Friend', friendSchema);
