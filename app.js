const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
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

const Projects = require('./repositories/Projects');

const app = express();

// settings locals
app.locals.tools = tools;
app.locals.company = config.company;

app.locals.ws_settings = config.ws_settings;

// JUSTE POUR TESTS, A PLACER DANS LA VUE
// navigation projet
Projects.getAll({limit: 4, orderField: "id", orderDirection: "desc", active: 1, diffused: 1, media: 1}).then(projects =>{
	console.log(projects);
    app.locals.ws_settings.navData.projects = projects;
});
/*
app.locals.ws_settings.navData.projects = [
    {id: 1, project_title:"Les demoiselles", imagepath:"/images/temp_projects/demoiselles.jpg", available:14},
    {id: 2, project_title:"Alexander II", imagepath:"/images/temp_projects/project-main-image-web.jpg", available:0},
    {id: 3, project_title:"Ines", imagepath:"/images/temp_projects/ines.jpg", available:3},
    {id: 4, project_title:"O. Strebelle", imagepath:"/images/temp_projects/strebelle.jpg", available:0}
];
*/

const actualDate = new Date();
const actualYear = actualDate.getFullYear();
app.locals.ws_settings.coreConfig.actualYear = actualYear;


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

// http://www.imoges.be/projets/id-projetctName/id-realty