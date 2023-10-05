// To do: check if all character are valid
export function validatePassword(value: string){
    if(value.length < 6){
        return false
    }

    const hasDigits = /\d/.test(value)
    const hasLetters = /\D/.test(value)

    if(!hasDigits || !hasLetters){
        return false
    }

    return true
}

export function validateEmail(value: string){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}