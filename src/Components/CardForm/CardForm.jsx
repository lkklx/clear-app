import React, { useState } from 'react';
import visaLogo from './visa.png';
import mastercardLogo from './mastercard.png';
import errorLogo from './alert.png';
import doneLogo from './true.png';
import './cardForm.scss';
import MaskInput from 'react-maskinput';
import { Validation } from "../../../src/Shared/Helpers/CardValidation.Helpers";
import { ValidationData } from "../../../src/Shared/Helpers/CardValidation.Helpers";
import { ValidationCVV } from "../../../src/Shared/Helpers/CardValidation.Helpers";




const CardForm = () => {


    const [cardInfo, setCardInfo] = useState({ number: 0, MM: "-1", YY: "-1", cvv: '' });
    const [validInfo, setValidInfo] = useState({
        number: {
            isValid: false,
            errorMsg: "Enter card number",
            paySys: "none"
        },
        date: {
            isValid: false,
            errorMsg: "Choose year and month"
        },
        cvv: {
            isValid: false,
            errorMsg: "Enter CVV"
        }
    });

    const onChangeFunctions = {
        number: (e) => {
            const name = e.target.name;
            const currentNumber = (e.target.value.replace(/ /g, ''));
            let { isValid, errorMsg, paySys } = Validation(currentNumber);
            setValidInfo({ ...validInfo, number: { isValid, errorMsg, paySys } });
            setCardInfo({ ...cardInfo, [name]: currentNumber });
        },
        date: (e, dateName) => {
            const name = dateName;
            if (name === "YY") {
                setCardInfo({ ...cardInfo, [name]: e.target.value });
                let { isValid, errorMsg } = ValidationData(cardInfo.MM, e.target.value);
                setValidInfo({ ...validInfo, date: { isValid, errorMsg } });

            }
            else {
                setCardInfo({ ...cardInfo, [name]: e.target.value });
                let { isValid, errorMsg } = ValidationData(e.target.value, cardInfo.YY);
                setValidInfo({ ...validInfo, date: { isValid, errorMsg } });

            }
        },
        cvv: (e) => {
            const name = e.target.name;
            let { isValid, errorMsg } = ValidationCVV(e.target.value);
            setValidInfo({ ...validInfo, cvv: { isValid, errorMsg } });
            setCardInfo({ ...cardInfo, [name]: e.target.value });
        }
    }

    const rensderYearSelect = () => {
        const date = new Date();
        const curYear = date.getFullYear() % 1000;
        let years = [];

        for (let i = 0; i < 5; i++)
            years.push(curYear + i);

        return years.map((item, index) => <option key={index} value={item}>{item}</option>)
    }
    const changeFunction = (e, dateName) => {
        const name = e.target.name;
        onChangeFunctions[name](e, dateName);
    }

    const pressButton = (e) => {
        console.log(cardInfo);
    }
    return (
        <div className="main-form">
            <div className="cardform">
                <div className="cardNumberInput">
                    <p className="text-style">Card number</p>
                    <MaskInput className="form-number" name="number" onChange={changeFunction} alwaysShowMask maskChar="X" mask="0000 0000 0000 0000" size={20} />
                    {validInfo.number.isValid ? <img src={doneLogo} /> : <img src={errorLogo} />}
                    <p className="error-message">{validInfo.number.errorMsg}</p>
                </div>
                <div className="cardDateInput">
                    <p className="text-date text-style">Date</p>
                    <p className="text-date text-style">MM/YY</p>
                    <select className="date-select" onChange={(e) => changeFunction(e, 'MM')} name="date">
                        <option value="-1">MM</option>
                        <option value="0">01</option>
                        <option value="1">02</option>
                        <option value="2">03</option>
                        <option value="3">04</option>
                        <option value="4">05</option>
                        <option value="5">06</option>
                        <option value="6">07</option>
                        <option value="7">08</option>
                        <option value="8">09</option>
                        <option value="9">10</option>
                        <option value="10">11</option>
                        <option value="11">12</option>
                    </select>
                    <select className="date-select" onChange={(e) => changeFunction(e, 'YY')} name="date">
                        <option value="-1">YY</option>
                        {rensderYearSelect()}
                    </select>
                    {validInfo.date.isValid ? <img src={doneLogo} /> : <img src={errorLogo} />}
                    <p className="error-message">{validInfo.date.errorMsg}</p>
                </div>
                <div className="cvv-form">
                    <div className="cardCVVInput">
                        <p className="text-style">CVV</p>
                        <MaskInput className="form-CVV" name="cvv" onChange={changeFunction} alwaysShowMask maskChar="X" mask="000" size={3} />
                        {validInfo.cvv.isValid ? <img src={doneLogo} /> : <img src={errorLogo} />}
                    </div>
                    <p className="error-message">{validInfo.cvv.errorMsg}</p>
                </div>
                <div className="paying-system-logo">
                    {(validInfo.number.paySys === "visa") ? <img src={visaLogo} /> : null}
                    {(validInfo.number.paySys === "mastercard") ? <img src={mastercardLogo} /> : null}
                </div>
            </div>
            {validInfo.cvv.isValid && validInfo.date.isValid && validInfo.number.isValid ? <button className="pay-button" onClick={pressButton}>PAY</button> : null}
        </div>
    )
}

export default CardForm;