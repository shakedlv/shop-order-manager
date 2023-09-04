export const Logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_isAdmin");
    localStorage.removeItem('login_expires')
    localStorage.removeItem("user_isAdmin");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_picture");
    localStorage.removeItem('login_expires')
}

