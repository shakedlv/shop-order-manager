export const validEmail = new RegExp(
   '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);


export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

export const isValidPassword = (password) => {
   if (!validPassword.test(password)) return [false, "Unknown characters in password"]

   if (password.length <= 6) return [false, "Password must be longer than 6 characters"]
   if (password.length >= 16) return [false, "Password must be shorter than 16 characters"]

   return [true, '']
}

export const isValidUsername = (username) => {

   if (username.length <= 6) return [false, "Username must be longer than 6 characters"]
   if (username.length >= 16) return [false, "Username must be shorter than 16 characters"]

   return [true, '']
}
