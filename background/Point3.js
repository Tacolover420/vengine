function Point3(x, y, z) {
    this.x = -x;
    this.y = -z;
    this.z = -y;
    this.sx = x;
    this.sy = y;

    function update() {    
        var nx = (this.x*500)+scrollx;
        var ny = (this.y*500)+scrolly;
        
        this.sx = (nx/(-this.z+5))+400;
        this.sy = (ny/(-this.z+5))+255;
    }
    
    function draw() {
        context.fillStyle = "blue";
        context.beginPath();

        context.moveTo(this.sx+2,this.sy);
        context.lineTo(this.sx,this.sy+2);
        context.lineTo(this.sx-2,this.sy);
        context.lineTo(this.sx,this.sy-2);
        context.lineTo(this.sx+2,this.sy);

        context.closePath();
        context.fill();
    }

    this.update = update;
    this.draw = draw;
}
