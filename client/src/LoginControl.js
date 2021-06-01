import axios from "axios";

class LoginControl {
    constructor() {
        this.LoggedIn = false;
        this.username = ''; // get this information from login, still working on it
    }
    

    getUsername() {
        return this.username;
    }

    login() {
        this.LoggedIn = true;
    }

    logout() {
        this.LoggedIn = false;
    }

    isLoggedIn() {
        return (this.LoggedIn);
    }

    //put the newly register user password and username into the database.
    //maybe need to display a page that notify that user the account creation is a success/failure. And redirect them to the calender.
    RegisterUser(user) {
  
        axios.post('http://localhost:9000/users/add', user)
        .then(res => console.log(res.data));
        //need to store this info into the passport
    }

    /***********************************************
     * CHECK IF A LOGIN IS REGISTERED
     ***********************************************/
    checkRegister(user) {
        console.log(user)
        const user_object = {
            username: user[0],
            password: user[1],
        }
        console.log(user_object)
        let returned = axios.get('http://localhost:9000/users/login', user_object)
        /***********************************************
         * THROW A TOKEN TO CHECK IF LOGIN SUCCESSFULLY
         ***********************************************/
        .then (res => console.log(res.data))
        .then (res => localStorage.setItem('token', res.user.token))
        .catch (err => console.log(err))
        this.username = returned.username
        console.log(returned.username)
        
    }


}
export default new LoginControl;
