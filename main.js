(function(global) {




    var ctx = document.getElementById('myCanvas').getContext('2d');
    var grid = []; 

    ctx.fillStyle = "red"; // Red color



    function runGame() {
        
                // createStartGrid();
                updateGrid();
                requestAnimationFrame(function() {
                   runGame();
                })
            }
        
            
    createStartGrid();
    runGame();

    


    function createStartGrid() {

        // need to create the arrays first within the grid with a value
        for(var x = 0; x < 400; x++) {
            grid[x] = [];
        }


         //row
        for(var x=0; x < 400; x++) {

            //column --> now we can set the column since it exists from first grid loop
            for(var y = 0; y < 400; y++) {

                var rawRandom = Math.random(); //get a raw random number

                var improvedNum = (rawRandom * 2); //convert it to an int
                
                var randomBinary = Math.floor(improvedNum);

                if (randomBinary === 1) {

                    ctx.fillRect(x,y,1,1);
                    grid[x][y] = 1;

                } else {

                    grid[x][y] = 0;
                }
            }
        }
    }
   
    //[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]
    //[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1], [9,1] 
    //[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2]
    //[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3]



    function updateGrid() {

        // start the loops at 1 to avoid the edges
        var fate;
        var state;
        var newGrid = grid; //copy grid so we can change state

        //row 
        for(var x=1; x < 400-1; x++) {
            
            //column -->
            for(var y=1; y < 400-1; y++) {

                cnt = getNeighborCnt(grid,x,y);
                state = grid[x][y];
                

                // is currently a live cell 
                if(state === 1) {

                    fate = isAliveOrDead(state, cnt);

                } 
                //is currently a dead cell
                else {

                    if(cnt === 3) {

                        fate = 1;
                        // fate = isAliveOrDead(state, cnt);
                    }
                }

                //set fate to live or die (1/0)
                newGrid[x][y] = fate;
            }
        }

        //reset orig grid then repaint to canvas
        grid = newGrid;
        repaint(grid);

    }

    function repaint(grid) {

        ctx.clearRect(0,0, 400, 400);

        for(var x=1; x<400-1;x++) {
        
        for(y=1; y<400-1; y++) {

            if(grid[x][y] === 1) {
                // console.log(newGrid[x][y]);
                ctx.fillRect(x,y,1,1);
            }
            
        }
    }
    // console.log('repainted');
}

    function isAliveOrDead(state, cnt) {

        //1 lives
        //0 dies

        // underpopulation (dies)
        if(state && cnt < 2) {

            // console.log('underpop')
            return 0;
        } 
        // overpopulation (dies)
        else if (state && cnt > 3) {

            // console.log('overpop')
            return 0;
        } 
        // lives
        else if ((state && cnt == 2) || (state && cnt === 3)) {

            // console.log('stay alive');
            return 1;

        } else if ((state === 0) && (cnt === 3)) {

            // console.log('alive')
            return 1;

        } else {
            // default nothing
            // console.log('def');
        }
    }

    
    function getNeighborCnt(grid, x, y) {

        var cnt=0;

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