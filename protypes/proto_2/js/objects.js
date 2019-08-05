
//Game Tile Base Object
function space(id, x, y) {
    this.id = id,
        this.x = x,
        this.y = y,
        this.size = game.tileSize,
        this.developed = false,
        this.occupants = [],
        this.watching_towers = [],
        this.occupied = false,
        this.tower = null,
        this.build = function (space_id) {
            var t = new tower(space_id)
            game.towers.push(t)
        },
        this.render = function (color) {
            this.color = color
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
}

//Tower Base Object
function tower(space_id) {

    game.spaces[space_id].developed = true
    game.spaces[space_id].tower = this

    this.id = space_id,
        this.x = game.spaces[this.id].x,
        this.y = game.spaces[this.id].y,
        this.type = 'wall',
        this.level = 1,
        this.color = '#000000',
        this.hoverColor = '#550000',
        this.range = 2,

        this.upgrade = function () {

            this.level++

            if (this.type === 'wall') {
                this.type = 'tower'
                this.color = '#ff3333'
                this.hoverColor = '#ff8888'
            }

            this.peer()
        },
        this.render = function () {

            var img = new Image()
            img.src = 'gfx/buildings/tower_' + this.level + '.png'


            if (this.id === game.hoverTile) {
                ctx.drawImage(img, this.x, this.y, game.tileSize, game.tileSize)
            } else {
                ctx.drawImage(img, this.x, this.y, game.tileSize, game.tileSize)
            }
        },
        this.wake = function () {
            //Detect visible tiles( spaces )
            game.spaces[this.id].occupied = true
        },
        this.peer = function () {
            //Check proximal tiles for occupancy
            if (game.spaces.length >= 1) {
                console.log("occupied")

            }
        },
        this.fall = function () {
            //console.log(myTowers[i].x)
        }
}

function arrow(space_id) {
    this.x =
        this.y
}

//Unit Base Object
class Unit {
    constructor(loc) {
        this.loc = loc;
        this.vel = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3)
        this.rad = 10;
        this.clr = "rgba(200, 0, 0, .5)";
    }
    run() {
        this.update()
        this.render()
        this.checkEdges()
    }
    checkEdges() {
        if (this.loc.x < 0 || this.loc.x > window.innerWidth) this.vel.x = - this.vel.x;
        if (this.loc.y < 0 || this.loc.y > window.innerHeight) this.vel.y = - this.vel.y;
    }
    update() {
        this.loc.add(this.vel);

    }
    render() {
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.stroke();
        ctx.fillStyle = this.clr;
        ctx.fill();
    }

}