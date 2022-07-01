import axios from "axios";

export const getAllStudent = async () => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        const res = await axios.post(`${process.env.React_App_URL}/get/getAllStudent.php`, params);
        
        if(res?.data?.error){
            console.error(res?.data?.error)
            return
        }

        return res?.data

    }catch(error){
        console.log(error)
        return false
    }
    
}