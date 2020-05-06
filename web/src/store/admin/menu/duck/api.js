import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const getMenus = data => {
 	return new Promise(async (resolve, reject) => {
      axios.post(`${HOSTNAME}/api/v1/auth/register`, data ,  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'}
            })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   })
}
