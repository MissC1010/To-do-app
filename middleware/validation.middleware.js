// Checks if the username in the request is valid or not
exports.invalidUsername = (req, res, next) => {
  if (endsWith(req.body.username, "@gmail.com")) {
    return next();
  }

  return res.status(403).send({ err: "Username can only end with @gmail.com" });
};

//Checks if the length of the task in the request exceeds the maximum length of 140 characters or not.
exports.maxTaskLength = (req, res, next) => {
  if (exceedsMaxLength(req.body.task, 140)) {
    return res.status(403).send({ err: "Task exceeds 140 characters" });
  }
  next();
};

//Checks if the content type of the HTTP request is JSON or not
exports.jsonContentType = (req, res, next) => {
  if (!req.is("application/json")) {
    return res
      .status(403)
      .send({ err: "Http request can only have a content type of json" });
  }
  next();
};

const endsWith = (value, endString) => {
  var extracted = value.substring(value.length - endString.length);
  return endString === extracted;
};

const exceedsMaxLength = (value, maxLength) => {
  return value && value.length > maxLength;
};
