const Error = require('../helpers/errorHandler');
const express = require('express');
const Record = require('../models/Record');
const requestChecker = require('../middleware/requestChecker');
const router = express.Router();

// Get the records from database according to given inputs.
router.post('/', requestChecker.verifyParams, requestChecker.verifyTypes, (req, res) => {
  var {
    startDate,
    endDate,
    minCount,
    maxCount
  } = req.body;

  Record.aggregate([
      // Each row has a Counts column and this code get the sum of it
      // and store it in totalCount field.
      {
        $project: {
          _id: false,
          key: 1,
          createdAt: 1,
          totalCount: {
            $reduce: {
              input: '$counts',
              initialValue: 0,
              in: {
                $add: ['$$value', '$$this']
              }
            }
          }
        }
      },

      // Apply given paramaters to filter the records
      {
        $match: {
          $and: [{
              createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            },
            {
              totalCount: {
                $gt: minCount,
                $lt: maxCount
              }
            }
          ]
        }
      }
    ])
    .exec()
    .then(data => {
      //If there is no error, return with success and show the record
      res.status(200).json({
        code: 0,
        msg: 'Success',
        records: data
      });
    })
    //If there is an error, catch and show it with related error message.
    .catch(err => {
      Error.systemError(res, err);
    });
});

module.exports = router;