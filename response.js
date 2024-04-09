const response = (statusCode, message, data, res) => {
    return res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
        },
        data: data,
        pagination: {
            prev: "",
            current: "",
            next: ""
        }
    })
}

module.exports = response