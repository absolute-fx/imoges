exports.index = function(req, res, next) {
	res.render('users', {
		title: 'USERS :)',
        type: 'default',
		someVar: 'this is a var'
	});
}