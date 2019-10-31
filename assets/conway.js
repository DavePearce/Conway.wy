function run(document,canvas) {
    var state = main$init(canvas.width,canvas.height);
    mainLoop(canvas,state);
}

function mainLoop(canvas,state) {      
    state = main$update(state);
    main$draw(canvas,state);    
    requestAnimationFrame(() => mainLoop(canvas,state));
}

