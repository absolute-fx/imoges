const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const session = require('express-session');
let config = require('./config/config');

const tools = require('./classes/Tools');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const historyRouter = require('./routes/history');
const aboutRouter = require('./routes/about');
const qualitychartRouter = require('./routes/qualitychart');
const pressRouter = require('./routes/press');
const termsRouter = require('./routes/terms');
const projectsRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const contactRouter = require('./routes/contact');
const realtyRouter = require('./routes/realty');
const realtiesRouter = require('./routes/realties');
const investRouter = require('./routes/invest');
const savRouter = require('./routes/sav');
const faqRouter = require('./routes/faq');
const loginRouter = require('./routes/login');
const videogalRouter = require('./routes/videogal');
const photogalRouter = require('./routes/photogal');
const newsletterRouter = require('./routes/newsletter');
const contactformRouter = require('./routes/contactform');
const authRouter = require('./routes/auth');
const accountRouter = require('./routes/account');



const app = express();

// settings locals
app.locals.tools = tools;
app.locals.company = config.company;

app.locals.ws_settings = config.ws_settings;

// JUSTE POUR TESTS, A PLACER AILIEURS
// navigation projet
const Projects = require('./repositories/Projects');
const Realties = require('./repositories/Realties');

Projects.getAll({countonly: 1, active: 1, diffused: 1}).then(totalProjects =>{
    app.locals.ws_settings.navData.totalProjects = totalProjects;
    Projects.getAll({limit: 4, orderField: "id", orderDirection: "desc", active: 1, diffused: 1, media: 1}).then(projects =>{
        //console.log(projects);
        app.locals.ws_settings.navData.projects = projects;
    });
});


const actualDate = new Date();
const actualYear = actualDate.getFullYear();
app.locals.ws_settings.coreConfig.actualYear = actualYear;
app.locals.accessToken = "";

// session
const cookieMaxAge = 60000;

let sess = {
    secret: 'mysecret',
    name: 'sid',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: cookieMaxAge,
        sameSite: true,
		secure: false
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/about', aboutRouter);
app.use('/history', historyRouter);
app.use('/qualitychart', qualitychartRouter);
app.use('/press', pressRouter);
app.use('/terms', termsRouter);
app.use('/projects', projectsRouter);
app.use('/project', projectRouter);
app.use('/contact', contactRouter);
app.use('/realty', realtyRouter);
app.use('/realties', realtiesRouter);
app.use('/invest', investRouter);
app.use('/sav', savRouter);
app.use('/faq', faqRouter);
app.use('/login', loginRouter);
app.use('/videogal', videogalRouter);
app.use('/photogal', photogalRouter);
app.use('/newsletter', newsletterRouter);
app.use('/contactform', contactformRouter);
app.use('/auth', authRouter);
app.use('/account', accountRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


module.exports = app;
