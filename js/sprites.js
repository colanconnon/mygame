/**
 * Created by colan on 10/12/14.
 */
function EnemyLaser()
{
    var tEnemyLaser = new Sprite(scene, "./images/lasers.png", 30, 20);
    tEnemyLaser.enemyFire = function()
    {
        this.show();
        this.setSpeed(enemyLaserSpeed);
        this.setBoundAction(DIE);
        this.setPosition(enemyShip.x,enemyShip.y);
        modifier = (Math.random() * spread) - (spread / 2);
        this.setAngle(enemyShip.angleTo(ship) + 180 + modifier);
    }
    return tEnemyLaser;
}
function EnemyShip()
{
    tEnemyShip = new Sprite(scene, "./images/SpaceShipSmall.png", 50, 50);
    tEnemyShip.isAlive = true;
    tEnemyShip.setSpeed(2);
    newX = Math.random() * this.cWidth;
    newY = Math.random() * this.cHeight;
    tEnemyShip.reset = function () {
        //set new random position
        newX = Math.random() * this.cWidth;
        newY = Math.random() * this.cHeight;
        this.setPosition(newX, newY);
    }
    tEnemyShip.reset();

    tEnemyShip.changeDirection = function ()
    {
        tEnemyShip.setAngle(ship.angleTo(tEnemyShip));
    }
    tEnemyShip.fireLaser = function()
    {
        if(tEnemyShip.isAlive)
        {
            EnemylaserElapsedTime = EnemyLaserTimer.getElapsedTime();
            if(EnemylaserElapsedTime > enemyDelay)
            {

                currentEnemyLaser++;
                if(currentEnemyLaser >= NUMENEMYLASERS)
                {
                    currentEnemyLaser = 0;
                }
                enemyLasers[currentEnemyLaser].enemyFire();
                laserSoundMP3.play();
                EnemyLaserTimer.reset();
            }
        }

    }
    tEnemyShip.respawn = function()
    {
        if(enemyRespawnTimer.getElapsedTime() > ENEMYSPAWNDELAY)
        {
            tEnemyShip.show();
            tEnemyShip.reset();
            enemyRespawnTimer = 0;
            EnemyLaserTimer = new Timer();
            tEnemyShip.isAlive = true;

        }
    }
    tEnemyShip.die = function()
    {
        enemyRespawnTimer = new Timer();
        tEnemyShip.hide();
        enemyShipHealth = 2;

        tEnemyShip.isAlive = false;
    }

    tEnemyShip.setBoundAction(STOP);



    return tEnemyShip;

}
function Asteroid()
{
    tAsteroid = new Sprite(scene, "./images/asteroid.png", 60, 60);
    tAsteroid.setSpeed(5);
    tAsteroid.setAngle((Math.random() * 90) - 45);
    tAsteroid.reset = function () {
        //set new random position
        newX = Math.random() * this.cWidth;
        newY = Math.random() * this.cHeight;
        this.setPosition(newX, newY);
    }
    tAsteroid.reset();
    return tAsteroid;

}
function Ship() {
    tShip = new Sprite(scene, "./images/shuttle2_0.png", 50, 50);
    tShip.maxSpeed = 15;
    tShip.minSpeed = -10;
    tShip.setSpeed(0);
    tShip.setAngle(0);
    tShip.checkKeys = function () {

        if (keysDown[K_LEFT]) {
            this.changeImgAngleBy(-7);
        } // end if
        if (keysDown[K_RIGHT]) {
            this.changeImgAngleBy(7);
        } // end if
        if (keysDown[K_UP]) {
            this.addVector(this.getImgAngle(), 3);
            if (this.speed > this.maxSpeed) {
                this.setSpeed(this.maxSpeed);
            } // end if
        } // end if
        if (keysDown[K_DOWN]) {
            this.addVector(this.getImgAngle(), -.5);
            if (this.speed < this.minSpeed) {
                this.setSpeed(this.minSpeed);
            } // end if
        } // end if
        if (keysDown[K_SPACE]){
            laserElapsedTime = laserTimer.getElapsedTime();
            if(laserElapsedTime > delay)
            {

                currentLaser++;
                if(currentLaser >= NUMLASERS)
                {
                    currentLaser = 0;
                }
                lasers[currentLaser].fire();
                laserSoundMP3.play();
                laserTimer.reset();
            }
        }
    }
    tShip.respawn = function ()
    {
        newX = Math.random() * this.cWidth;
        newY = Math.random() * this.cHeight;
        this.setPosition(newX,newY);
    }
    tShip.checkDrag = function () {
        speed = this.getSpeed();
        speed *= .80;
        this.setSpeed(speed);
    }
    return tShip;
}
function Laser()
{
    var tLaser = new Sprite(scene, "./images/lasers.png", 30, 20);
    tLaser.hide();

    tLaser.fire = function()
    {
        this.show();
        this.setSpeed(65);
        this.setBoundAction(DIE);
        this.setPosition(ship.x,ship.y);
        this.setAngle(ship.getImgAngle());

    }

    return tLaser;
}
function LaserPowerUp()
{
    var tPowerUp = new Sprite(scene, "./images/superlaser.png", 40,40);
    tPowerUp.spawnPercentage = .0025;
    tPowerUp.hide();
    tPowerUp.pTimer;
    tPowerUp.pTime = 5; //Time for powerup to last

    tPowerUp.spawn = function () {
        randvalue = Math.random();
        if(randvalue < tPowerUp.spawnPercentage)
        {
            tPowerUp.show();
            tPowerUp.setSpeed(0);
            newX = Math.random() * this.cWidth;
            newY = Math.random() * this.cHeight;
            tPowerUp.setPosition(newX, newY);
            tPowerUp.pTimer = new Timer();
        }



    }
    tPowerUp.checkForEnd = function()
    {
        if(powerUpTimer != null)
        {

            if(powerUpTimer.getElapsedTime() >= powerUpTime )
            {
                delay = 1;
            }
        }
        if(tPowerUp.pTimer != null)
        {
            if(tPowerUp.pTimer.getElapsedTime() > tPowerUp.pTime)
            {
                tPowerUp.hide();
            }
        }


    }

    return tPowerUp;
}