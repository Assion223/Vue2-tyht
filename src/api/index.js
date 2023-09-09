import http from '../utils/request'
export const getDate=function() {
    return http.get('/home/getDate')
}
export const getUser=function(params){
    return http.get('/user/getUser',params)
}
export const addUser=function(data){
    return http.post('/user/add',data)
}
export const editUser=function(data){
    return http.post('/user/edit',data)
}
export const delUser=function(data){
    return http.post('/user/del',data)
}
export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}