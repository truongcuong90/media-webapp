import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  prettyOrigin: String,
  origins: [ String ],
  disabled: {
    type: Boolean,
    default: false
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

export default mongoose.model('Project', schema)
