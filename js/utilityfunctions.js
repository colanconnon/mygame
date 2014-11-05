/**
 * Created by colan on 10/12/14.
 */
function updateScore() {
    //update the scoreboard
    scoreDiv.innerHTML = "Score: " + score + ". Time: " + eTime;
}
function updateLives()
{
    if(NUMLIVES == 0)
    {
        ship.hide();
        scene.stop();
        document.getElementById("reset").style.visibility = 'visible';
    }
    livesDiv.innerHTML = "Lives: " + NUMLIVES;
}
function checkTime() {
    eTime = timer.getElapsedTime();
    if (eTime > MAXTIME) {
        scene.stop();
        document.getElementById("reset").style.visibility = 'visible';
    } // end if
    updateScore();

}



function makeLasers()
{
    lasers = new Array(NUMLASERS);
    for(i = 0; i < NUMLASERS; i++){
        lasers[i] = new Laser();
    }

}
function makeEnemyLasers()
{
    enemyLasers = new Array(NUMENEMYLASERS);
    for(i = 0; i < NUMENEMYLASERS; i++){
        enemyLasers[i] = new EnemyLaser();
        enemyLasers[i].hide();
    }

}
function updateLasers()
{
    for(i = 0; i < NUMLASERS; i++){
        lasers[i].update();
    }
}
function updateEnemyLasers()
{
    for(i = 0; i < NUMENEMYLASERS; i++){
        enemyLasers[i].update();
    }
}
function restart() {
    document.location.href = "";
}
function checkForLevelUpdate()
{
    updateLives();
    levelDiv.innerHTML = "Current level " + (currentLevel + 1);
    nextLevelDiv.innerHTML = "Amount of asteroids to kill to get to next level:" +   (numAsteroidsToNextLevel - numAsteroidsKilled);
    if(numAsteroidsKilled >= numAsteroidsToNextLevel)
    {

        currentLevel++;
        //load data from json here
        numAsteroidsKilled = 0;
        numCurrentAsteroids= levelsArray.levels[currentLevel].numEnemyAsteroids;
        numAsteroidsToNextLevel = levelsArray.levels[currentLevel].asteroidsToNextLevel;
        ENEMYSPAWNDELAY = levelsArray.levels[currentLevel].EnemyShipRespawnDelay;
        enemyLaserSpeed = levelsArray.levels[currentLevel].EnemyLaserSpeed;
        enemyDelay = levelsArray.levels[currentLevel].EnemyShootDelay;


    }

}
function setupAsteroids() {
    asteroids = new Array(NUMASTEROIDS);
    for (i = 0; i < NUMASTEROIDS; i++){
        asteroids[i] = new Asteroid();
        asteroids[i].hide();
    }
}