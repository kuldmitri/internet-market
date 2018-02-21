function httpError(message, status) {
    const err = new Error(message);
    err.status = status;
    return err;
}

exports.createBadRequestError = function () {
    return httpError('Invalid request data', 400);
};

exports.createAuthenticationError = function (message) {
    return httpError(message, 401);
};

exports.createAccessDeniedError = function (message) {
    return httpError(message, 403);
};

exports.createUnprocessableEntityError = function (message) {
    return httpError(message, 422);
};
