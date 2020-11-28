//card number check
const firstNumberValidation = (number) => {
    if (number[0] === '4')
        return ("visa");
    if (number[0] === '5')
        return ("mastercard");
    return "none";
}

const fullNumberValidation = (number) => {
    return !number.includes('X');
}

const numberValidation = (number) => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        if ((i + 1) % 2 !== 0) {
            if (number[i] * 2 > 9)
                sum += (number[i] * 2 - 9);
            else
                sum += number[i] * 2;
        }
        else
            sum += (number[i] * 1);
    }
    return (sum % 10 === 0);
}

const checkValidation = (number) => {
    let isValid = true, errorMsg = "", paySys = firstNumberValidation(number);
    if (firstNumberValidation(number) === "none") {
        errorMsg += "Invalid paying system.";
        isValid = false;

    }
    if (fullNumberValidation(number) === false) {
        errorMsg += "Enter full number.";
        isValid = false;
    }
    if (numberValidation(number) === false) {
        errorMsg += "Card number is not valid.";
        isValid = false;
    }
    return { isValid, errorMsg, paySys };
}
//card number check

// exppiration data check
const checkDataValidation = (MM, YY) => {
    const date = new Date();
    let errorMsg = "",isValid = true;
    const curYear = (date.getFullYear() % 1000);
    const curMonth = (date.getMonth());
    if (MM === "-1") {
        errorMsg += "Choose month. "
        isValid = false;
    }
    if (YY === "-1") {
        errorMsg += "Choose year. "
        isValid=false;
    }
    if (YY * 1 === curYear && MM * 1 < curMonth){
        errorMsg += "Out of expiration date"  
        isValid = false;
    }
    return { isValid, errorMsg}

}
// exppiration data check

// CVV check
const checkCVV = (cvv) =>{
    let errorMsg = "", isValid = true;
    if(cvv.includes('X')){
        isValid = false;
        errorMsg += "Enter full CVV"
    }
   return {isValid, errorMsg}
}
//CVV check


export const Validation = checkValidation;
export const ValidationData = checkDataValidation;
export const ValidationCVV = checkCVV;