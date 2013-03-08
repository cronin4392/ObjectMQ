window.ObjectMQ = {

	mqElements: Array(),
	MQs: Array(),
	activeMQ: null,

	init: function() {
		var _this = this;

		var $elements = $('body').find('.mq-element-js');

		$elements.each(function(index) {
			var $object = $(this);
			var triggers = _this.parseMQTriggers( $object.attr('data-mq-triggers') );

			var sameElem = false;
			var prevElem = _this.mqElements[_this.mqElements.length-1];
			if( prevElem ) {
				var $prevObj = prevElem.object;
				sameElem = _this.compareElements( $object, $prevObj );
			}
			if( sameElem ) {
				$prevObj = $prevObj.add($object);
				prevElem.object = $prevObj;
			}
			else {
				var object = {
					'object': $object,
					'triggers': triggers
				};
				_this.mqElements.push( object );
			}
		});
	},

	compareElements: function($first, $second) {
		var sameClass = false;
		var sameWidth = false;
		var sameParent = false;

		if( $first.attr('class') === $second.attr('class') ) {
			sameClass = true;
		}
		if( $first.width() === $second.width() ) {
			sameWidth = true;
		}
		if( $first.parent().is($second.parent()) ) {
			sameParent = true;
		}
		if( sameClass && sameWidth && sameParent ) {
			return true;
		}
		else {
			return false;
		}
	},

	applyMQ: function() {
		var _this = this;

		$.each(_this.mqElements, function(index, value) {
			var object = this;
			var $object = object.object;
			var triggers = object.triggers;
			object.width = $object.width();
			var width = object.width;

			var currentLT = object.currentLT;
			var currentGT = object.currentGT;
			
			// if undefined its the first set
			// if width goes out of bounds, re-set the classes
			if( ( typeof currentLT === "undefined" ) || (object.width < currentGT || object.width > currentLT) ) {
				var gtClasses = "";
				var ltClasses = "";

				var ltSet = false;

				// loop through each MQ trigger set on element
				// and apply appropriate lt&gt classes
				$.each(triggers, function(index, value) {
					var ltClass = 'lt-'+value;
					var gtClass = 'gt-'+value;
					var classes = ltClass+" "+gtClass;
					
					$object.removeClass( classes );

					if( value <= width ) {
						gtClasses += 'gt-'+value+' ';
						object.currentGT = value;
					}
					else if(value > width) {
						ltClasses += 'lt-'+value+' ';

						if( !ltSet ) {
							object.currentLT = value;
							ltSet = true;
						}
					}
				});
				var classes = "";
				
				if( gtClasses ) {
					classes += gtClasses;
				}
				if( ltClasses ) {
					classes += ltClasses;
				}
				$object.addClass(classes);
			}
		});
	},

	parseMQTriggers: function(string) {
		var array = string.split(',');
		return array;
	},
	arrayUnique: function(array) {
		var uniqueArr = [];
		$.each(array, function(i, el){
			if($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
		});
		return uniqueArr.sort(function(a,b){return a-b});
	}
}