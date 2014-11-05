var Responder = {
	answer: function(data){
		this.res.status(this.successStatus);
		(data) ? this.res.json(data || {}) : this.res.end();
	},
	refuse: function(message){
		this.res.status(400).send(message || "Malformed request…");
	},
	confess: function(message){
		this.res.status(500).send(message || "The guy who coded me is either a lazy shit or a dumb sucker!");
	},
	answerNotFound: function(message){
		this.res.status(404).send(message || "Are you sure you know what you're looking for ?");
	}
};

module.exports = function(res, successStatus){
	return Object.create(Responder, {res: {value: res}, successStatus: {value: successStatus || 200}});
};
