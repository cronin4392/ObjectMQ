window.ObjectMQ = {

	mqElements: Array(),
	MQs: Array(),
	activeMQ: null,

	init: function() {
		var _this = this;

		var $elements = $('body').find('.mq-element-js');

		// Build an object with all MQ elements, their break-points and original classes
		$elements.each(function(index) {
			var $object = $(this);
			var triggers = _this.parseMQTriggers( $object.attr('data-mq-triggers') );

			var sameElem = false;
			var prevElem = _this.mqElements[_this.mqElements.length-1];
			if( prevElem ) {
				var $prevObj = prevElem.object;
				sameElem = _this.compareElements( $object, $prevObj );
			}
			// If object is the "same" as the previous one just parsed
			// add it to the previous one
			if( sameElem ) {
				$prevObj = $prevObj.add($object);
				prevElem.object = $prevObj;
			}
			else {
				var object = {
					'object': $object,
					'triggers': triggers,
					'originalClass': $object.attr('class')
				};
				_this.mqElements.push( object );
			}
		});
	},

	applyMQ: function() {
		var _this = this; 
		$.each(_this.mqElements, function(index, value) {
			var object = this;
			var $object = object.object;
			var triggers = object.triggers;
			object.width = $object.width();
			var width = object.width;
			var originalClass = object.originalClass;

			var currentLT = object.currentLT;
			var currentGT = object.currentGT;
			
			// if currentMQ is unset then set it
			// if currentMQ is set then only reset if the width has gone out of the bounds
			if( ( typeof currentLT === "undefined" ) || (object.width < currentGT || object.width > currentLT) ) {
				var gtClasses = "";
				var ltClasses = "";

				var ltSet = false;

				// loop through each MQ trigger set on element
				// and apply appropriate lt&gt classes
				// note: adjusting class through attr is about 60% faster than with add/removeClass
				$.each(triggers, function(index, value) {
					var ltClass = 'lt-'+value;
					var gtClass = 'gt-'+value;
					var classes = ltClass+" "+gtClass;
					
					//$object.removeClass( classes );
					$object.attr('class', originalClass);

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
				//$object.addClass(classes);
				$object.attr('class', originalClass+" "+classes);
			}
		});
	},

	/*
	** Create Array from a string
	*/
	parseMQTriggers: function(string) {
		var array = string.split(',');
		return array;
	},

	/*
	** Takes an array and returns on without any duplicated and numerically ASC
	*/
	arrayUnique: function(array) {
		var uniqueArr = [];
		$.each(array, function(i, el){
			if($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
		});
		return uniqueArr.sort(function(a,b){return a-b});
	},

	/*
	** Takes 2 jQuery objects and compares them
	** If they have the same class, width and parent they are deemed the same
	*/
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
	}
}