const validate = (values) => {
    const errors={};
    if(!values.name || (values.name && values.name.trim() == "")) errors.name = "Required"
    if(!values.expiredAt) errors.expiredAt = "Required"
    return errors;
}

export default validate;