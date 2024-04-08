const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to log requests
app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `Received ${req.method} request for ${req.url} from ${req.ip}`
    });
    next();
});

// Arithmetic endpoints

// Addition endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input parameters for addition');
        return res.status(400).send('Invalid input parameters for addition');
    }
    const result = num1 + num2;
    res.send(`Result: ${result}`);
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input parameters for subtraction');
        return res.status(400).send('Invalid input parameters for subtraction');
    }
    const result = num1 - num2;
    res.send(`Result: ${result}`);
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input parameters for multiplication');
        return res.status(400).send('Invalid input parameters for multiplication');
    }
    const result = num1 * num2;
    res.send(`Result: ${result}`);
});

// Division endpoint
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
        logger.error('Invalid input parameters for division');
        return res.status(400).send('Invalid input parameters for division');
    }
    const result = num1 / num2;
    res.send(`Result: ${result}`);
});

// Exponentiation endpoint
app.get('/exponentiate', (req, res) => {
    const base = parseFloat(req.query.base);
    const exponent = parseFloat(req.query.exponent);
    if (isNaN(base) || isNaN(exponent)) {
        logger.error('Invalid input parameters for exponentiation');
        return res.status(400).send('Invalid input parameters for exponentiation');
    }
    const result = Math.pow(base, exponent);
    res.send(`Result: ${result}`);
});

// Square root endpoint
app.get('/squareroot', (req, res) => {
    const num = parseFloat(req.query.num);
    if (isNaN(num) || num < 0) {
        logger.error('Invalid input parameter for square root');
        return res.status(400).send('Invalid input parameter for square root');
    }
    const result = Math.sqrt(num);
    res.send(`Result: ${result}`);
});

// Modulo endpoint
app.get('/modulo', (req, res) => {
    const dividend = parseFloat(req.query.dividend);
    const divisor = parseFloat(req.query.divisor);
    if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
        logger.error('Invalid input parameters for modulo operation');
        return res.status(400).send('Invalid input parameters for modulo operation');
    }
    const result = dividend % divisor;
    res.send(`Result: ${result}`);
});

// Root path
app.get('/', (req, res) => {
    res.send('Welcome to the Advanced Arithmetic Operations API. Use /add, /subtract, /multiply, /divide, /exponentiate, /squareroot, /modulo endpoints to perform arithmetic operations.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});