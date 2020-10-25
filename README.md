# getir-backend-project

This app is a RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

### To run on your localhost

- Install node js then

```sh
$ git clone https://github.com/hamitg/getir-backend-project.git
$ npm i
$ npm run start
```

### API Endpoint

The request should be POST and its payload includes a JSON with 4 fields which are startDate, endDate, minCount and maxCount.
Dates should be in YYYY-MM-DD format and startDate cannot be greater than endDate.
Counts should be numbers and minCount cannot be greater than maxCount.

### Example Request

```jsx
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

### Example Response

```jsx
{
  "code":0,
  "msg":"Success",
  "records":[
    {
      "key": "ibfRLaFT",
      "createdAt": "2016-12-25T16:43:27.909Z",
      "totalCount": 2892
    }
  ]
}
```
