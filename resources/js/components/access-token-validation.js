import { useState, useEffect } from 'react';
import axios from 'axios';


export default () => {
  const [isTokenValid, setIsTokenValid] = useState(null);

  const config = {
  	headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}
  };
 	console.log("im here");

	const loadData = async () => {
		try{
	        const response = await axios.get('/api/task',{headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}})
	        							.then(response=>{
											setIsTokenValid(true);
											console.log("token success status: ",isTokenValid);
								        })
								        .catch(errors => {
								        	setIsTokenValid(false);
								        	console.log("token error status: ",isTokenValid);
								        })
					
   		} catch (e) {		
    	}
	};
	loadData();

  return isTokenValid;
}