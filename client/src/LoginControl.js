import axios from "axios";

class LoginControl {
    constructor() {
        this.LoggedIn = false;
        this.username = 'Admin'; // get this information from login, still working on it
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
        //register works now
        axios.post('http://localhost:9000/users/register', user)
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
        let returned = function(user_object) {
            return axios.get('http://localhost:9000/users/login', user_object)
        }
        let returned_object = returned(user_object)
        returned_object.then(function(result) {
            console.log(result) 
        })

        /***********************************************
         * THROW A TOKEN TO CHECK IF LOGIN SUCCESSFULLY
         ***********************************************/
        //.then (res => localStorage.setItem('token', res.user.token))
        //.catch (err => console.log(err))
        //this.username = returned.username
        //console.log(returned)
        
    }


}
export default new LoginControl;
