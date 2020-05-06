import mongoose from 'mongoose'
import mongodb from 'mongodb'
var Schema = mongoose.Schema

// create a schema
var lockSchema = new Schema({
  name: String,
  macId:String,
  userId: { type: Schema.ObjectId, ref: 'User' },
},{
  timestamps: true
})

//Make user Modal
const Lock = mongoose.model('Lock', lockSchema)

export default Lock

// // Get users
// export const getUser = (callback, limit) => {
//   User.find(callback).limit(limit)
// }

// // Get User By Id
// export const getUserById = (id, callback) => {
//   User.findOne({ '_id': new mongodb.ObjectID(id) }, callback)
// }

// // Add user
// export const addUser = (user, callback) => {
//   User.create(user, callback)
// }

// // Update user
// export const updateUser = (id, update, options, callback) => {
//   var query = { _id: new mongodb.ObjectID(id) }
//   User.findOneAndUpdate(query, update, options, callback)
// }

// // Delete user
// export const removeUser = (id, callback) => {
//   var query = { _id: new mongodb.ObjectID(id) }
//   User.remove(query, callback)
// }