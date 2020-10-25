const Error = require('../helpers/errorHandler');

// Middleware to check if given parameters are in the desired format.
module.exports.verifyParams = function (req, res, next) {
  //Check if any parameters is missing
  if (req.body.constructor === Object && Object.keys(req.body).length < 4) {
    Error.parametersMissing(res);
  }
  //Check if any parameters is undefined  
  else if (
    req.body.startDate == undefined ||
    req.body.endDate == undefined ||
    req.body.minCount == undefined ||
    req.body.maxCount == undefined
  ) {
    Error.parametersUndefined(res);
  }
  //Check if startDate is before endDate  
  else if (
    req.body.startDate > req.body.endDate
  ) {
    Error.invalidDate(res);
  }
  //Check if minCount is smaller than maxCount    
  else if (
    req.body.minCount > req.body.maxCount
  ) {
    Error.invalidCount(res);
  } else next();
};

// Function to check whether given parameters are in the desired format.
module.exports.verifyTypes = function (req, res, next) {
  var {
    startDate,
    endDate,
    minCount,
    maxCount
  } = req.body;

  // Create a regex to check whether dates are in YYYY-MM-DD format
  var dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  //Check types and apply regex
  if (
    typeof startDate === 'string' &&
    startDate.match(dateRegex) &&
    typeof endDate === 'string' &&
    endDate.match(dateRegex) &&
    typeof minCount === 'number' &&
    typeof maxCount == 'number'
  )
    next();
  else Error.parametersWrong(res);
};