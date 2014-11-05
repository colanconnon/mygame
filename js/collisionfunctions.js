/**
 * Created by colan on 10/12/14.
 */
function checkEnemyCollisions(i)
{

    if(enemyLasers[i].collidesWith(ship))
    {

        if(shipTimer.getElapsedTime() > shipDelay)
        {
            NUMLIVES--;
            ship.respawn();
            updateLives();

            gameOverMP3.play();
            shipTimer = new Timer();
        }


    }
}
function checkShipCollision()
{
    if(enemyShip.collidesWith(ship))
    {

        if(shipTimer.getElapsedTime() > shipDelay)
        {
            explosionSoundMP3.play();
            ship.respawn();
            enemyShip.reset();
            NUMLIVES--;
            updateLives();
            shipTimer = new Timer();
        }


    }
    if(laserPowerUp.collidesWith(ship))
    {
        delay = .2; // increase the laser fire speed
        laserPowerUp.hide();
        powerUpTimer = new Timer();

    }
}
function checkCollisions(asteroidNum,laserNum)
{
    if(ship.collidesWith(asteroids[asteroidNum])){

        if(shipTimer.getElapsedTime() > shipDelay)
        {
            NUMLIVES--;
            updateLives();

            gameOverMP3.play();

            asteroids[asteroidNum].reset();
            ship.respawn();
            shipTimer = new Timer();
        }
    }
    if(lasers[laserNum].collidesWith(asteroids[asteroidNum]))
    {
        asteroids[asteroidNum].reset();
        explosionSoundMP3.play();
        lasers[laserNum].hide();
        numAsteroidsKilled++;


        score += 5;
        updateScore();

    }
    if(lasers[laserNum].collidesWith(enemyShip))
    {
        enemyShipHealth--;
        lasers[laserNum].hide();
        if(enemyShipHealth == 0)
        {

            score += 50;
            explosionSoundMP3.play();
            updateScore();
            enemyShip.die();

        }
    }

}