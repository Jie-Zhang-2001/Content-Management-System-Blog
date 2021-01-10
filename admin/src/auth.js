class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout() {
        this.authenticated = false;
        localStorage.clear();
        document.cookie ='token=; Max-Age=0;'
    }
    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();