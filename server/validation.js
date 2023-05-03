module.exports={
    checkUserName(username){
        if(typeof username==="undefined"){
            throw 'Error: The Username Must be Supplied'
        }
        if(typeof username!="string"){
            throw 'Error: The Username Is Not of Valid Type'
        }
        if(username.length<3|| !(/[A-Za-z0-9]{5,}$/.test(username)) || username.trim()==="" || username.indexOf(" ")>-1){
            throw 'Error: The Username is not in the correct format'
        }
        return username;
    },
    checkPassWord(password)
     {
        if(typeof password==="undefined")
        {
            throw 'Error: The Password Must be Supplied'
        }
        if(typeof password!="string"){
            throw 'Error: The Password Is Not of Valid Type'
        }
         if(password.length<6)
         {
            throw "Error: The Password is not of right length"
         }
         if(/[A-Z]/.test(password)){
            if(/[a-z]/.test(password)){
                if(/[0-9]/.test(password)){
                    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
                        return password;
                    }else{
                        throw 'Error: Password Needs Special Character'
                    }
                }else{
                    throw 'Error: Password Needs Numbers'
                }
            }else{
                throw 'Error: Password Needs Lowercase Letters'
            }
         }else{
            throw 'Error: Password Needs Capital Letters'
         }
     },
     checkName(name){
        if(typeof name==="undefined")
        {
            throw 'Error: The Name Must be Supplied'
        }
        if(typeof name!="string"){
            throw 'Error: The Name Is Not of Valid Type'
        }
         if(name.length<2 || !(/^[A-Za-z ]*$/.test(name)) || name.trim()==="")
         {
            throw "Error: The Name is not in the correct format"
         }
        return name;
     },
     checkEmail(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return email
        }else{
            throw "Error: The Email is in the incorrect format"
        }
     }
}