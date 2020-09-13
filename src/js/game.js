const RUNNING = 1;
const STOPPED = 0;
/**
 * Status of the game (i.e. whether is running or not).
 */
var status = STOPPED;

/**
 * Records X,Y click position (in game squares)
 */
var clickX = -1;
var clickY = -1;

/**
 * Maintain previous timestamp to help manage framerate.
 */
var previous = 0;

/**
 * Rate at which state should be updated (in ms)
 */
var rate = 100;

/**
 * Event handler for click events on the canvas.
 */
function click(event,canvas) {
    var rect = canvas.getBoundingClientRect();
    clickX = Math.floor((event.clientX - rect.left) / 20);
    clickY = Math.floor((event.clientY - rect.top) / 20);
}

/**
 * Event handler for start/stop button clicks.
 */
function startstop(event) {
    if(status == RUNNING) {
	event.target.innerHTML="START";	
	status = STOPPED;
    } else {
	event.target.innerHTML="STOP";	
	status = RUNNING;
    }
}

/**
 * Event handler for slider change
 */
function slide(event) {
    rate = event.target.value;
}

/**
 * The main event loop.
 */
function loop(timestamp,canvas,state) {
    var progress = timestamp - previous;
    if(clickX != -1) { state = main$click(clickX,clickY,state); clickX = -1;}
    if(progress > rate && status == RUNNING) {
        state = main$update(state);    
        previous = timestamp;
    }
    main$draw(canvas,state);
    requestAnimationFrame((timestamp) => loop(timestamp,canvas,state));
}

/**
 * Entry point for running the game
 */
function run(canvas,button,slider) {
    var state = main$init(canvas.width,canvas.height);
    canvas.addEventListener('click',(e) => click(e,canvas),true);
    button.addEventListener('click',startstop,true);
    slider.addEventListener('input',slide,true);
    loop(0,canvas,state);
}
