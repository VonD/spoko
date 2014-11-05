var Responder = require('./responder');

module.exports = function(app){
	var getRouteId = function(req, res, next){
		req.resourceId = req.param('id');
		next();
	};
	return {
		registerEndpoint: function(args){
			app.route(args.path)
				.get(function(req, res, next){
					var responder = Responder(res);
					responder.answer([{resource: 'found'}]);
				})
				.post(function(req, res, next){
					var responder = Responder(res, 201);
					responder.answer({resource: 'created'});
				});
			app.route(args.path + '/:id')
				.get(
					getRouteId,
					function(req, res, next){
						var responder = Responder(res);
						responder.answer({resource: req.resourceId});
					}
				)
				.put(
					getRouteId,
					function(req, res, next){
						var responder = Responder(res);
						responder.answer({resource: req.resourceId});
					}
				)
				.delete(
					getRouteId,
					function(req, res, next){
						var responder = Responder(res, 204);
						responder.answer();
					}
				);
		}
	}
};
