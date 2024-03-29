class Tower {
    // issue#1 use preloaded images
    constructor(cost, tImg, bImg, ability) {
        this.loc = JSVector(0, 0);
        this.ability = ability;
        this.placed = false;
        this.visible = false;
        this.enX = 0;
        this.enY = 0;
        this.cost = cost;
        this.bulletImg = bImg;
        this.towImg = tImg;
        this.towAngle = 0;
        this.lastTime = Date.now();
        this.coolDown = 500;
        towerGame.bankValue = towerGame.bankValue - this.cost;
        this.enemies = towerGame.enemies
        this.range = 200;
        this.shotSound = new Audio("audio/archer-shooting.mp3")
        this.shotSound2 = new Audio("audio/archer-shooting-fire.mp3")


        this.ability = ability;
        this.target = null
        this.enemy = null
    }

    run() {
        this.render();
        this.update();
    }

    render() {
        if (this.ability == "freeze") {
            this.coolDown = 2500
            console.log(towerGame.value); //2500
            this.range = 500;
        }
        else if (this.ability == "normal") {
            this.coolDown = 700 //700
        } else if (this.ability == "fast") {
            this.coolDown = 200; //200
        } else if (this.ability == "explosive") {
            this.coolDown = 100
        }
        var ctx = towerGame.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        // ctx.rotate(this.towAngle + Math.PI / 2);
        if (!this.placed && this.loc.x !== 0) {
            ctx.beginPath();
            ctx.arc(0, 0, this.range, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(192, 192, 192, 0.5)';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }
        if (this.visible) { //  not visible when first created

            //  ctx.drawImage(this.towImg, -this.towImg.width/2,-this.towImg.height/2);
            ctx.drawImage(bsImage, this.towImg.x, this.towImg.y, this.towImg.w, this.towImg.h, -this.towImg.w / 2, -this.towImg.h / 2, this.towImg.w, this.towImg.h);
        }

        ctx.restore();
    }

    update() {


        //  console.log(slider1.value);

        //  Rotate turret to follow mouse
        this.enemy = this.findEnemy()
        if (this.enemy) {
            this.target = this.enemy.loc
        } else {
            this.target = JSVector(towerGame.canvas.mouseX, towerGame.canvas.mouseY)
        }
        let dx = this.loc.x - this.target.x;
        let dy = this.loc.y - this.target.y;
        this.towAngle = Math.atan2(dy, dx) - Math.PI;
        this.checkEnemies();
    }

    checkEnemies() {
        let dx = this.loc.x - this.target.x;
        let dy = this.loc.y - this.target.y;
        let dist = JSVector(dx, dy).length();
        let millis = Date.now();
        if (this.placed &&
            dist < this.range &&
            (millis - this.lastTime > this.coolDown) && towerGame.enemies.length != 0 && this.target.x != towerGame.canvas.mouseX) {
            // reset lastTime to current time
            this.lastTime = millis;
            let bulletLocation = JSVector(this.loc.x, this.loc.y);
            //console.log(this.ability);
            let b = new Bullet(bulletLocation, this.bulletImg, this.towAngle, this.ability);
            //  towerGame.bullets.push(b);
            if (this.ability != "ray" && this.ability != "freeze") {
                //console.log("shoot");

                towerGame.bullets.push(b);
                this.shotSound.play()
            }
            if (this.ability == "freeze") {
                let sb = new Bullet(bulletLocation, this.bulletImg, this.towAngle, this.ability)
                towerGame.bullets.push(sb);
                this.shotSound2.play()
            }
        }
        if (this.ability == "ray" && towerGame.enemies.length != 0) {
            let sb = new Bullet(bulletLocation, this.bulletImg, this.towAngle, this.ability)
            towerGame.bullets.push(sb);
            this.shotSound2.play()
        }
    }
    findEnemyIndex() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].loc.dist(this.loc) < this.range) {
                return i;
            }
        }
    }
    findEnemy() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].loc.dist(this.loc) < this.range) {
                return this.enemies[i]
            }
        }
    }

} 