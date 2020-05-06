import mongoose from 'mongoose'
import mongodb from 'mongodb'
var Schema = mongoose.Schema

// create a schema
var userSchema = new Schema({
  name: String,
  password: String,
  dob: { type: Date }
},{
  timestamps: true
})

//Make user Modal
const User = mongoose.model('User', userSchema)

export default User

// Get users
export const getUser = (callback, limit) => {
  User.find(callback).limit(limit)
}

// Get User By Id
export const getUserById = (id, callback) => {
  User.findOne({ '_id': new mongodb.ObjectID(id) }, callback)
}

// Add user
export const addUser = (user, callback) => {
  User.create(user, callback)
}

// Update user
export const updateUser = (id, update, options, callback) => {
  var query = { _id: new mongodb.ObjectID(id) }
  User.findOneAndUpdate(query, update, options, callback)
}

// Delete user
export const removeUser = (id, callback) => {
  var query = { _id: new mongodb.ObjectID(id) }
  User.remove(query, callback)
}