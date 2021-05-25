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

    // add throw token to backend here maybe?
}
export default new LoginControl;
