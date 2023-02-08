export const isValidName = (stringName) => stringName !== '';

export const isValidEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))

//Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
export const isValidPassword = (stringPassword) => (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(stringPassword))

export const isValidRePassword = (stringPassword, stringRePassword) => stringPassword === stringRePassword

export const isValidPhoneNumber = (stringPhoneNumber) => (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(stringPhoneNumber))

export const isValidEmailPhone = (txt) => isValidEmail(txt) || isValidPhoneNumber(txt)
