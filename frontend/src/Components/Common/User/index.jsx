import './index.scss';
import { getAuth } from "firebase/auth";

/*

export async function getUser(){
    try{
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:5001/api/auth",{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch user"); 
        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}
*/