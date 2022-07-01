import axios from "axios";

export const createSchedule = async (value) => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({...value}));

        const created = await axios.post(`${process.env.React_App_URL}/create/createSchedule.php`, params);
        
        if(created?.data?.toString()?.trim()!=='success'){
            return false
        }

        return true

    }catch(error){
        console.log(error)
        return false
    }
    
}

export const getSchedulePaginator = async (value) => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        console.log(value)

        params.append('data', JSON.stringify({...value}));

        const res = await axios.post(`${process.env.React_App_URL}/get/getSchedulePaginator.php`, params);
        
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

export const getScheduleByMonth = async (value) => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({...value}));

        const res = await axios.post(`${process.env.React_App_URL}/get/getScheduleByMonth.php`, params);
        
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

export const getScheduleByMonthPool = async (value) => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({...value}));

        const res = await axios.post(`${process.env.React_App_URL}/get/getScheduleByMonthPool.php`, params);
        
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

export const deleteSchedule = async (value) => {

    try{
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({...value}));

        const res = await axios.post(`${process.env.React_App_URL}/delete/deleteSchedule.php`, params);
        if(res?.data==='' || res?.data?.error){
            console.error(res?.data?.error)
            return {
                status:false,
                message:res?.data?.error
            }
        }

        return {
            status:true,
            message:res?.data?.success
        }

    }catch(error){
        return {
            status:false,
            message:error.message
        }
    }
    
}