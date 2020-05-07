import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

export const getUserList = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.get(`${HOSTNAME}/api/v1/auth/getUsers`  ,{headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    } })
	 .then(function (response) {
	   resolve(response.data);
	 })
	 .catch(function (error) {
	   reject(error);
	 });
   })
}

export const getAdmin = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.get(`${HOSTNAME}/api/v1/auth/getAdmin`  ,{headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    } })
	 .then(function (response) {
	   resolve(response.data);
	 })
	 .catch(function (error) {
	   reject(error);
	 });
   })
}
