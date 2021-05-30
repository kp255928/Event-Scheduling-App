import axios from "axios";

class LoginControl {
    constructor() {
        this.LoggedIn = false;
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
        console.log("1");
        
        axios.post('http://localhost:9000/users/add', user)
        .then(res => console.log(res.data));
        //need to store this info into the passport
    }

    /***********************************************
     * CHECK IF A LOGIN IS REGISTERED
     ***********************************************/
    checkRegister(user) {
        console.log("2");

        /***********************************************
         * NEED TO BE FIXED WITH URL I THINK
         ***********************************************/
        axios.post('http://localhost:9000/users', user)
        
        /***********************************************
         * THROW A TOKEN TO CHECK IF LOGIN SUCCESULLY
         ***********************************************/
        .then (res => localStorage.setItem('token', res.user.token))
        .catch (err => console.log(err))
    }


}
export default new LoginControl;
