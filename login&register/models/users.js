//1.引入mongoose模块
const mongoose = require('mongoose');
//2.获取Schema对象---------------------->请了一个保安
const Schema = mongoose.Schema;
//3.创建约束---------------------->告诉保安他的任务是干什么
let usersSchema = new Schema({
    userName:{
    type:String,
    required:true
  },
  pwd:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  date:{
    type:Date,
    default:Date.now()
  },
  enableFlag:{
    type:String,
    default:'Y'
  }
});

let UsersModel = mongoose.model('users',usersSchema);

module.exports = UsersModel;