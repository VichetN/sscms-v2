import moment from "moment";

export function keyMenu(e){

    const myArr = e.split("/");
    let x = ""

    if(myArr[1] === 'schedule'){
        x="schedule"
    }
    else if(myArr[1] === 'report'){
        x="report"
    }

    else if(myArr[1] === 'user'){
        x="user"
    }
    
    else{
        x=""
    }
    
    return x
}

export const timeSelect = () =>{
    let data =[]
    for(let i=6;i<=20;i++){
  
        for(let j=0 ;j< 4;j++){
            let min = j <= 1 ? '00':'30'
            let minTo = j === 0 || j===3 ? '30': '00'

            let hourTo = j>0 ? i+1:i

            let time = `${i}:${min}-${hourTo}:${minTo}`

            data.push(time)
        }
    }

    return data;
    
}  

export const menuPaperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

export const getFormattedTime = (datetime) =>{
    return moment(datetime).format('hh:mmA')
}