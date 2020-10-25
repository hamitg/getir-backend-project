// Error list
const Error = {};

// Error function for system errors
Error.systemError = (res, err) => {
  res.status(500).json({
    code: 1,
    msg: 'System error.'
  });
};

// Error function for invalid endpoint
Error.notFound = res => {
  res.status(404).json({
    code: 3,
    msg: 'Endpoint is wrong.'
  });
};

// Error function for invalid syntax
Error.badRequest = (res, err) => {
  res.status(400).json({
    code: 2,
    msg: 'Body syntax is wrong.'
  });
};

// Error function for missing request parameters
Error.parametersMissing = res => {
  res.status(400).json({
    code: 4,
    msg: 'There is at least one parameter which is not given. startDate, endDate, minCount and maxCount should be passed.'
  });
};

// Error function for undefined parameters
Error.parametersUndefined = res => {
  res.status(400).json({
    code: 5,
    msg: 'There is at least one parameter which is undefined. All parameters should be defined'
  });
};

// Error function for invalid startDate and endDate pair
Error.invalidDate = res => {
  res.status(400).json({
    code: 6,
    msg: 'startDate should be before the endDate'
  });
};

// Error function for invalid minCount and maxCount pair
Error.invalidCount = res => {
  res.status(400).json({
    code: 7,
    msg: 'minCount should be smaller than maxCount'
  });
};

// Error function for invalid request parameters
Error.parametersWrong = res => {
  res.status(400).json({
    code: 8,
    msg: 'startDate and endDate must be in (YYYY-MM-DD) format. minCount and maxCount must be a number'
  });
};

module.exports = Error;