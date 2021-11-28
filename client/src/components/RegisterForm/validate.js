
const validate = (values) => {
    const errors = {};
    if (!values.password || (values.password && values.password.trim() == "")) {
        errors.password = "Required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be greater than 8"
    }
    if (!values.name || (values.name && values.name.trim() == "")) errors.name = "Required"
    if (!values.email || (values.email && values.email.trim() == "")) errors.email = "Required"
    return errors;
}

export default validate;