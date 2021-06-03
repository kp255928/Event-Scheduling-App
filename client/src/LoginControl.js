import Axios from "axios";
import signup from './directories/SignUp.js';
class LoginControl {
    
    constructor() {
        this.LoggedIn = false;
        this.username = 's';
        
    }
    setUsername(name){
        this.username = name;
    }
    
    getUsername() {
        return this.username;
    }

    login() {
        this.LoggedIn = true;
    }

    logout() {
        new LoginControl;
    }

    isLoggedIn() {
        return (this.LoggedIn);
    }
    
    //put the newly register user password and username into the database.
    //maybe need to display a page that notify that user the account creation is a success/failure. And redirect them to the calender.
    RegisterUser(user) {
       return Axios({
            method: "POST",
            data: user,
            withCredentials: true,
            url: "http://localhost:9000/users/register",
          }).then((res) => {
              console.log(res.data.message)
              return res.data.message;         
          });
    }

    /***********************************************
     * CHECK IF A LOGIN IS REGISTERED
     ***********************************************/
    
    checkRegister(user) {
        const user_object = {
            username: user[1],
            password: user[0]
        }
        console.log(user_object)
        var ok;
            return Axios({
                method: "POST",
                data: user_object,
                withCredentials: true,
                url: "http://localhost:9000/users/login",
              }) .then((res) => {
                //this.username = res.username;
                return res.data.message;
              });
    }
 
    
  
    



}
export default new LoginControl;
