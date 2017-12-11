(function(global) {


        //[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]
        //[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1], [9,1] 
        //[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2]
        //[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3]


    var ctx = document.getElementById('myCanvas').getContext('2d');
    //create separate arrays each with own memory location
    var grid =  createArray(400); 
    var newGrid = createArray(400);
    // grid size
    var xCoord = 400;
    var yCoord = 400;
    //color of the canvas painting
    ctx.fillStyle = "#d02fd0";

    var startBtn = document.getElementsByClassName('btn')[0];
    var stopBtn = document.getElementsByClassName('btn')[1];
    var id;




    function startGame(e) {
        e.preventDefault();
        createGrid();
        fillLiveCells();
        runGame();

        toggleHidden(startBtn);
        toggleHidden(stopBtn);


    }

    function stopGame(e) {
        e.preventDefault();
        window.cancelAnimationFrame(id);
        toggleHidden(startBtn);
        toggleHidden(stopBtn);
    }

    function toggleHidden(element) {
        if(!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    }

    function runGame() {

        updateGrid();
        id = requestAnimationFrame(function() {
            runGame();
        })
    }

    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
        
            
    // createGrid(); // create x,y coordinate 2d array
    // fillLiveCells(); // fill the canvas with live cells
    // runGame(); //continously run game

    


    function getOneOrZero() {
        var random = Math.random(); //get a random number 0-1
        random = (random * 2); //convert it to an int
        return Math.floor(random); // return 0 or 1
    }


    function createArray(rows) { 
        //need to create array with inner array before we can turn it into a jagged array aka 2d array
        var arr = [];
        for (var i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }


    function createGrid() {

        //dyanamically create the 2d array
        //can now automatically tack on y value for 2d after initial array creation 

         //row
        for(var x=0; x < xCoord; x++) {

            //column --> now we can set the column since it exists from first grid loop
            for(var y = 0; y < yCoord; y++) {

                var binary = getOneOrZero();

                if (binary === 1) {

                    grid[x][y] = 1;

                } else {

                    grid[x][y] = 0;
                }
            }
        }
    }


    function fillLiveCells() {

        // start x,y at 1
        for (var x = 1; x < xCoord; x++) { 
            for (var y = 1; y < yCoord; y++) { 
                // only fill canvas with live cells = 1
                if (grid[x][y] === 1) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }
   

    function updateGrid() {

       // start the loops at 1 to avoid the edges and end at -1 as well otherwise errors 
        var fate;
        var state;

        //x coordinate values
        for(var x = 1; x < xCoord - 1; x++) {
            
            //y coordinate values
            for(var y = 1; y < yCoord - 1; y++) {
 
                var state = grid[x][y];
                var cnt = getNeighborCnt(grid,x,y);

                // living cell
                if(state === 1) {

                    if(cnt < 2) {
                        fate = 0;
                    } else if (cnt === 2) {
                        fate = 1;
                    } else if (cnt === 3) {
                        fate = 1;
                    } else if (cnt > 3) {
                        fate = 0;
                    } else {
                        //default
                        fate = 0;
                    }
                }

                //dead cell
                if(state === 0) {

                    if(cnt === 3) {
                        fate = 1;
                    } else {
                        // default
                        fate = 0;
                    }
                }

                //set new state alive or dead
                newGrid[x][y] = fate;
            }
        }    

        // set orig grid to new state (must run loop to change values)
        for (var x = 0; x < xCoord; x++) { //iterate through rows
            for (var y = 0; y < yCoord; y++) { //iterate through columns
                grid[x][y] = newGrid[x][y];
    
            }
        }  
        //now repaint the canvas element with new state
        repaint(grid);
    }


    function repaint(grid) {
 
        ctx.clearRect(0,0, 400, 400); //clear canvas

        for(var x = 1; x < xCoord; x++) {
        
        for(y = 1; y < yCoord; y++) {

            if(grid[x][y] === 1) {
   
                ctx.fillRect(x,y,1,1); //repaint canvas
            }
            
        }
    }
}

  
    
    function getNeighborCnt(grid, x, y) {

        //[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]
        //[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1], [9,1] 
        //[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2]
        //[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3]      

        let cnt = 0;

        // perform logic to get the number of dead or alive neighbor pixels

        //top left
        if(grid[x-1][y-1] === 1) {
            cnt++;
        }

        // //top middle
        if(grid[x][y-1] === 1) {
            cnt++;
        }

        // //top right 
        if(grid[x+1][y-1] === 1) {
            cnt++;
        }

        // //middle left 
        if(grid[x-1][y] === 1) {
            cnt++;
        }

        // //middle right
        if(grid[x+1][y] === 1) {
            cnt++;
        }

        // //bottom left
        if(grid[x-1][y+1] === 1) {
            cnt++;
        }

        // //bottom middle
        if(grid[x][y+1] ===1) {
            cnt++;
        }

        // //bottom right
        if(grid[x+1][y+1] === 1) {
            cnt++;
        }

        return cnt;

    }



})(window);