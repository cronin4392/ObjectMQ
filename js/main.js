$(function() {
	Main.init();
});

window.Main = {
	$body: null,
	touchy: null,
	$window: null,
	windowWidth: null,
	resizeTimeout: null,

	init: function() {
		var _this = this;

		// set vars
		_this.$window = $(window);
		_this.windowWidth = _this.$window.width();

		_this.bindEventHandlers();

		ObjectMQ.init();
		ObjectMQ.applyMQ();
	},

	bindEventHandlers: function() {
		var _this = this;

		_this.$window.on('resize', function() {
			clearTimeout( _this.resizeTimeout );
			_this.resizeTimeout = setTimeout(function() {
				_this.windowWidth = _this.$window.width();
				ObjectMQ.applyMQ();
			}, 75);
		});

		$('body').on('click', '.filter-toggle-js, .filter-toggle-js a', function(e) {
			e.preventDefault();
			var $filters = $(this).parent();

			if( $filters.hasClass('closed') ) {
				$filters.removeClass('closed');
			}
			else {
				$filters.addClass('closed');
			}

			ObjectMQ.applyMQ();
		});
	}
};

