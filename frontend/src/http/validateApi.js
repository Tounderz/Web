import { useEffect, useState } from "react";
import { ZERO } from "../utils/const";

export const useInput = (intialValue, validations) => {
    const [value, setValue] = useState(intialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target?.value || '')
    }

    const onSelect = (e) => {
        setValue(e.map(item => {return item.id}))
    }

    const onRemove = (e) => {
        setValue(e.map(item => {return item.id}))
    }

    const saveImg = (e) => {
        if (!e.target.files.length) {
            setValue(ZERO)
        } else {
            setValue(e.target.files[0])
        }
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onSelect,
        onRemove,
        onBlur,
        saveImg,
        isDirty,
        ...valid
    }
}

const useValidation = (value, validations) => {
    const [minLengthError, setMinLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordSecurityError, setPasswordSecurityError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [multiSelectError, setMultiSelectError] = useState(false)
    const [isNumberError, setIsNumberError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [isRoleError, setIsRoleError] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch(validation) {
                case 'minLength':
                    value.length < validations[validation].value ? setMinLengthError(true) : setMinLengthError(false); 
                    setMessageError(`The '${validations[validation].name}' field can't to empty and less than ${validations[validation].value} characters.`);
                    break;
                case 'isEmail':
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    setMessageError(`The 'email' field can't to empty or Incorrect email.`);
                    break;
                case 'isPhone':
                    const rePhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                    rePhone.test(value) ? setPhoneError(false) : setPhoneError(true);
                    setMessageError(`The 'phone' field can't to empty or Incorrect phone number.`);
                    break;
                case 'isPasswordSecurity':
                    const rePasswordSecurity = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
                    rePasswordSecurity.test(value) ? setPasswordSecurityError(false) : setPasswordSecurityError(true);
                    break;
                case 'isConfirmPassword':
                    value === validations[validation] ? setConfirmPasswordError(false) : setConfirmPasswordError(true);
                    setMessageError(`The password doesn't match.`);
                    break;
                case 'multiSelect':
                    value.length < 1 ? setMultiSelectError(true) : setMultiSelectError(false);
                    setMessageError(`The '${validations[validation].name}' field can't to empty.`);
                    break;
                case 'isNumberId':
                    Number(value) < 1 ? setIsNumberError(true) : setIsNumberError(false);
                    setMessageError(`The '${validations[validation].name}' field can't to empty.`);
                    break;
                case 'isPrice':
                    Number(value) < 1 ? setPriceError(true) : setPriceError(false);
                    setMessageError(`The '${validations[validation].name}' field can't be less than or equal to 0.`);
                    break;
                case 'isRole':
                    value === validations[validation] ? setIsRoleError(true) : setIsRoleError(false);
                    setMessageError(`You can't assign a role like yours`);
                    break;
                default:
                    break;
            }
        }
    }, [validations, value])

    useEffect(() => {
        if (minLengthError || emailError || phoneError || passwordSecurityError || confirmPasswordError || multiSelectError || isNumberError || priceError || isRoleError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [minLengthError, emailError, phoneError, passwordSecurityError, confirmPasswordError, multiSelectError, isNumberError, priceError, isRoleError])

    return {
        minLengthError,
        emailError,
        phoneError,
        passwordSecurityError,
        confirmPasswordError,
        multiSelectError,
        isNumberError,
        priceError,
        isRoleError,
        messageError,
        inputValid
    }
}