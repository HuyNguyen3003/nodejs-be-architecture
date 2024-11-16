const StatusCode = {
    OK: '200',
    CREATED: '201',
}

const ReasonStatusCode = {
    CREATED: 'Create',
    OK: 'Success',
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        this.message = message || reasonStatusCode;
        this.statusCode = statusCode;
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);

    }
}


class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata});
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED , reasonStatusCode = ReasonStatusCode.CREATED ,metadata}) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse
}