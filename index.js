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
// app.get('/math', handleMath);

// set up rule that says requests to "/math" should be
// handled by the handleMathService function
// app.get('/math_service', handleMathService);


// set up rule that says requests to "/math" should be
// handled by the handleCalculation function
app.get('/calculation', handleCalculation);


// start the server to listen
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// get the values from the form input, then carry out math
// function handleMath(request, response) {
//   const operation = request.query.operation;
//   const operand1  = Number(request.query.operand1);
//   const operand2  = Number(request.query.operand2);
//   computeOperation(response, operation, operand1, operand2);
// }

// get the values from the form input, then carry out math
// function handleMathService(request, response) {
//   const operation = request.query.operation;
//   const operand1  = Number(request.query.operand1);
//   const operand2  = Number(request.query.operand2);
//   computeOperationJson(response, operation, operand1, operand2);
// }

// get the values from the form input, then carry out math
function handleCalculation(request, response) {
  const weight  = Number(request.query.weight);
  const type = request.query.mailType;
  let rate = 0;

  if (type == "stamped") {
    if (weight >= 0 && weight <= 1) {
      rate = 0.55;
    } else if (weight <= 2) {
      rate = 0.70;
    } else if (weight <= 3) {
      rate = 0.85;
    } else if (weight <= 3.5) {
      rate = 1;
    } 
  } else if (type == "metered") {
    if (weight >= 0 && weight <= 1) {
      rate = 0.50;
    } else if (weight <= 2) {
      rate = 0.65;
    } else if (weight <= 3) {
      rate = 0.80;
    } else if (weight <= 3.5) {
      rate = 0.95;
    }
  } else if (type == "flats") {
    if (weight >= 0 && weight <= 1) {
      rate = 1.00;
    } else if (weight <= 2) {
      rate = 1.20;
    } else if (weight <= 3) {
      rate = 1.40;
    } else if (weight <= 4) {
      rate = 1.60;
    } else if (weight <= 5) {
      rate = 1.80;
    } else if (weight <= 6) {
      rate = 2.00;
    } else if (weight <= 7) {
      rate = 2.20;
    } else if (weight <= 8) {
      rate = 2.40;
    } else if (weight <= 9) {
      rate = 2.60;
    } else if (weight <= 10) {
      rate = 2.80;
    } else if (weight <= 11) {
      rate = 3.00;
    } else if (weight <= 12) {
      rate = 3.20;
    } else if (weight <= 13) {
      rate = 3.40;
    }
  } else { // retail
    if (weight >= 0 && weight <= 1) {
      rate = 3.80;
    } else if (weight <= 2) {
      rate = 3.80;
    } else if (weight <= 3) {
      rate = 3.80;
    } else if (weight <= 4) {
      rate = 3.80;
    } else if (weight <= 5) {
      rate = 4.60;
    } else if (weight <= 6) {
      rate = 4.60;
    } else if (weight <= 7) {
      rate = 4.60;
    } else if (weight <= 8) {
      rate = 4.60;
    } else if (weight <= 9) {
      rate = 5.30;
    } else if (weight <= 10) {
      rate = 5.30;
    } else if (weight <= 11) {
      rate = 5.30;
    } else if (weight <= 12) {
      rate = 5.30;
    } else if (weight <= 13) {
      rate = 5.90;
    }
  }

  calculateRate(response, type, weight, rate);
}

// carry out math
function calculateRate(response, type, weight, rate) {
  let result = 0;

  if (type == "stamped") {
    result = rate;
  } else if (type == "metered") {
    result = rate;
  } else if (type == "flats") {
    result = rate;
  } else if (type == "retail") {
    result = rate;
  }

  const params =
    {
      type: type,
      weight: weight,
      result: result
    };

    response.render('pages/result_calc', params);
}



// carry out math
// function computeOperation(response, op, left, right) {
//   // op = op.toLowerCase();
//   let result = 0;

//   if (op == "Add") {
//     result = left + right;
//   } else if (op == "Subtract") {
//     result = left - right;
//   } else if (op == "Multiply") {
//     result = left * right;
//   } else if (op == "Divide") {
//     result = left / right;
//   }

//   const params =
//     {
//       operation: op,
//       left: left,
//       right: right,
//       result: result
//     };

//     response.render('pages/result', params);
// }


// carry out math
// function computeOperationJson(response, op, left, right) {
//   // op = op.toLowerCase();
//   let result = 0;

//   if (op == "Add") {
//     result = left + right;
//   } else if (op == "Subtract") {
//     result = left - right;
//   } else if (op == "Multiply") {
//     result = left * right;
//   } else if (op == "Divide") {
//     result = left / right;
//   }

//   const params =
//     {
//       operation: op,
//       left: left,
//       right: right,
//       result: result
//     };

//     parameters = JSON.stringify(params, null, '\t');
//     response.render('pages/result_service', {parameters});
//     // response.render('pages/result_service', {params});
// }


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/math', (req, res) => res.render('pages/math'))
//   .get('/math', doMath)
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));