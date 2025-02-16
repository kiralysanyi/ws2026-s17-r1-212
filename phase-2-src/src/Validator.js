/* Note: I only put this comment here to remember the data structure because I forget everything 🫡
"name": "Test location",
"description":"Test demo description",
"postalCode": 1000,
"city": "Budapest",
"address": "Test address 55.",
"from":"08:00",
"to": "23:30",
"openAt": "Weekdays",
*/

function validatePostalCode(input) {
    return /^\d{4}$/.test(input);
}

function validate(formdata) {
    const errors = {}

    //check name
    if (formdata.name == undefined || formdata.name.trim() === "") {
        errors["name"] = "Required"
    } else {
        if (formdata.name.length < 3 || formdata.name.length > 32) {
            errors["name"] = "Name has to be between 3-32 characters."
        }
    }

    //check description
    if (formdata.description == undefined || formdata.description.trim() === "") {
        errors["description"] = "Required"
    } else {
        if (formdata.description.length < 10 || formdata.description.length > 256) {
            errors["description"] = "Name has to be between 10-256 characters."
        }
    }

    //check postalCode
    if (formdata.postalCode == undefined || formdata.postalCode.trim() === "") {
        errors["postalCode"] = "Required"
    } else {
        if (!validatePostalCode(formdata.postalCode.trim())) {
            errors["postalCode"] = "Postal code should be a 4 digit number."
        }
    }

    //check city
    if (formdata.city == undefined || formdata.city.trim() === "") {
        errors["city"] = "Required"
    } else {
        if (formdata.city.length < 3 || formdata.city.length > 32) {
            errors["city"] = "City value has to be between 3-32 characters."
        }
    }

    //check address
    if (formdata.address == undefined || formdata.address.trim() === "") {
        errors["address"] = "Required"
    } else {
        if (formdata.address.length < 3 || formdata.address.length > 128) {
            errors["address"] = "Address value has to be between 3-128 characters."
        }
    }

    //check from (operational hours)
    if (formdata.from == undefined || formdata.from.trim() === "") {
        errors["from"] = "Required"
    }

    //check to (operational hours)
    if (formdata.to == undefined || formdata.to.trim() === "") {
        errors["to"] = "Required"
    }

    return errors;
}

export default validate