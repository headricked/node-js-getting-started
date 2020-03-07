const express = require('express')
// const path = require('path')
const app = express();
const port = process.env.PORT || 5000

// use the public directory as one where static files reside
app.use(express.static(__dirname + '/public'));

// views directory for the template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up rule that says requests to "/math" should be
// handled by the handleMath function
app.get('/math', handleMath);

// set up rule that says requests to "/math" should be
// handled by the handleMathService function
app.get('/math_service', handleMathService);


// start the server to listen
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// get the values from the form input, then carry out math
function handleMath(request, response) {
  const operation = request.query.operation;
  const operand1  = Number(request.query.operand1);
  const operand2  = Number(request.query.operand2);

  computeOperation(response, operation, operand1, operand2);
}

// get the values from the form input, then carry out math
function handleMathService(request, response) {
  const operation = request.query.operation;
  const operand1  = Number(request.query.operand1);
  const operand2  = Number(request.query.operand2);

  computeOperationJson(response, operation, operand1, operand2);
}

// carry out math
function computeOperation(response, op, left, right) {
  // op = op.toLowerCase();
  let result = 0;

  if (op == "Add") {
    result = left + right;
  } else if (op == "Subtract") {
    result = left - right;
  } else if (op == "Multiply") {
    result = left * right;
  } else if (op == "Divide") {
    result = left / right;
  }

  const params =
    {
      operation: op,
      left: left,
      right: right,
      result: result
    };

    response.render('pages/result', params);
}
// carry out math
function computeOperationJson(response, op, left, right) {
  // op = op.toLowerCase();
  let result = 0;

  if (op == "Add") {
    result = left + right;
  } else if (op == "Subtract") {
    result = left - right;
  } else if (op == "Multiply") {
    result = left * right;
  } else if (op == "Divide") {
    result = left / right;
  }

  const params =
    {
      operation: op,
      left: left,
      right: right,
      result: result
    };

    parameters = JSON.stringify(params, null, '\t');
    response.render('pages/result_service', {parameters});
    // response.render('pages/result_service', {params});
}


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/math', (req, res) => res.render('pages/math'))
//   .get('/math', doMath)
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));