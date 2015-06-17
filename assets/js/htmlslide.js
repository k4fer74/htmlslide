
	// Author: github.com/matheuslugon

	var HTMLSLIDE = {


		config: {

			slides: document.querySelectorAll("[data-htmlslide]"),
			control: 0

		},


		options: {

			arrowTop: document.querySelector("#arrow-top"),
			arrowDown: document.querySelector("#arrow-down"),
			marker: document.querySelector("#marker"),
			markers: this.marker.children,
			speed: 500

		},


		init: function ( options ) {

			this.setOptions( options );

			this.setPositions();
			this.createMarkers();
			this.setKeysEvents();
			this.setEvents();
			this.checkArrow();
			this.addActiveClass();

		},


		setOptions: function ( options ) {

			if ( typeof options == "object" ) {
				
				for ( var prop in options ) {

					if ( this.options.hasOwnProperty(prop) ) {

						this.options[prop] = options[prop];

					}

				}

			} else {

				console.log("Not possible start the options");

			}

		},


		setPositions: function () {

			for ( var i = 0; i < this.config.slides.length; i++) {
				this.config.slides[i].setAttribute("data-slide", i);
			}

		},


		checkArrow: function () {

			setInterval( function () {

				if ( HTMLSLIDE.config.control == 0 ) {
					HTMLSLIDE.options.arrowTop.style.display = "none";
				} else if ( HTMLSLIDE.config.control == HTMLSLIDE.config.slides.length - 1 ) {
					HTMLSLIDE.options.arrowDown.style.display = "none";
				} else {
					HTMLSLIDE.options.arrowTop.style.display = "block";
					HTMLSLIDE.options.arrowDown.style.display = "block";
				}

			}, HTMLSLIDE.options.speed);

		},


		setEvents: function () {

			this.options.arrowTop.addEventListener("click", function() {
				HTMLSLIDE.moveTop( HTMLSLIDE.getPosition("top"), HTMLSLIDE.options.speed );
			});

			this.options.arrowDown.addEventListener("click", function() {
				HTMLSLIDE.moveDown( HTMLSLIDE.getPosition("down"), HTMLSLIDE.options.speed );
			});

			for ( i = 0; i < this.config.slides.length; i++ ) {
				this.addEventMarkers(i);
			}

		},


		setKeysEvents: function () {

			window.addEventListener("keydown", function(e) {

				switch(e.which) {

			        case 38: // up
						HTMLSLIDE.moveTop( HTMLSLIDE.getPosition("top"), HTMLSLIDE.options.speed );
						HTMLSLIDE.options.arrowTop.classList.add("opacity");
						setTimeout(function() {
							HTMLSLIDE.options.arrowTop.classList.remove("opacity");
						}, HTMLSLIDE.options.speed);
			        break;

			        case 40: // down
			        	HTMLSLIDE.moveDown( HTMLSLIDE.getPosition("down"), HTMLSLIDE.options.speed );
			        	HTMLSLIDE.options.arrowDown.classList.add("opacity");
			        	setTimeout(function() {
			        		HTMLSLIDE.options.arrowDown.classList.remove("opacity");
			        	}, HTMLSLIDE.options.speed);
			        break;

			        default:
			        	return;
			        break;
			        
			    }

			    e.preventDefault();

			});


		},


		setControl: function ( to ) {

			if ( to == "top" ) {
				this.config.control -= 1;
				// console.log("Current slide = " + this.config.control);
			} else if ( to == "down" ) {
				this.config.control += 1;
				// console.log("Current slide = " + this.config.control);
			} else {
				console.log("Não foi possível utilizar o setControl(); ");
			}

		},


		getPosition: function ( element ) {

			if ( element == "top" ) {
				return this.config.slides[ parseFloat(Number(this.config.control)) - parseFloat(Number(1)) ].offsetTop;
			} else if ( element == "down" ) {
				return this.config.slides[ parseFloat(Number(this.config.control)) + parseFloat(Number(1)) ].offsetTop;
			} else {
				return 0;
			}

		},


		moveTop: function ( position, speed ) {

			this.setControl("top");
			$("html, body").animate({ scrollTop: position }, speed);

			this.addActiveClass();

			// console.log( "Position X: " + position + " ---- Speed: " + speed );

		},


		moveDown: function ( position, speed ) {

			this.setControl("down");
			$("html, body").animate({ scrollTop: position }, speed);

			this.addActiveClass();

			// console.log( "Position X: " +  position + " ---- Speed: " + speed );

		},


		createMarkers: function () {

			for ( var i = 0; i < this.config.slides.length; i++ ) {

				var marker = document.createElement("a");
					marker.setAttribute("data-to-slide", i);

				this.options.marker.appendChild(marker);

			}

		},


		addEventMarkers: function ( i ) {

			this.options.markers[i].addEventListener("click", function(){
				HTMLSLIDE.moveTo( HTMLSLIDE.config.slides[i] );
			});

		},


		moveTo: function ( element ) {

			this.config.control = Number(element.getAttribute("data-slide"));

			this.addActiveClass();

			var position = element.offsetTop;

			$("html, body").animate({ scrollTop: position }, HTMLSLIDE.options.speed);

		},


		addActiveClass: function () {

			for ( var i = 0; i < this.options.markers.length; i++ ) {

				this.options.markers[i].classList.remove("active");

			}

			this.options.markers[this.config.control].classList.add("active");

		}


	}