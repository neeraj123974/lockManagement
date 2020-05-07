import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const registerUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	     reject(error);
	  });
   })
}

 export const loginUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

export const createLock = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.post(`${HOSTNAME}/api/v1/auth/createLock`, data ,{headers: {
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

export const getUserLock = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.get(`${HOSTNAME}/api/v1/auth/getUserLock`  ,{headers: {
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

export const deleteUserLock = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.post(`${HOSTNAME}/api/v1/auth/deleteUserLock` , data ,{headers: {
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

export const editUserLock = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.put(`${HOSTNAME}/api/v1/auth/editUserLock` , data ,{headers: {
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

export const deleteUser = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.post(`${HOSTNAME}/api/v1/auth/deleteUser` , data ,{headers: {
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

export const editUser = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.put(`${HOSTNAME}/api/v1/auth/editUser` , data ,{headers: {
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

export const getMe = data => {
	let token = localStorage.getItem('token');
 	return new Promise(async (resolve, reject) => {
       axios.get(`${HOSTNAME}/api/v1/auth/getMe`  ,{headers: {
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