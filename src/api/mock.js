import Mock from 'mockjs'
import homeapi from './mockData/home'
import user from './mockData/user'
import permission from './mockData/permission'

Mock.mock('/api/home/getDate',homeapi.getStatisticalData())

Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu)