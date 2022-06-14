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