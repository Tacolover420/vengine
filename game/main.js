char = [[],
        []]

var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}

function ldist(x1, y1, x2, y2, xo, yo) {
    if (x1==x2) {
        return new sPoint(yo-y1,xo-x1);
    }
    if (y1==y2) { 
        return new sPoint(xo-x1,yo-y1);
    }
    
    var m = (y1-y2)/(x1-x2);
    var b = y1-(m*x1);
    
    var m2 = -1/m;
    var b2 = yo-(m2*xo);
    
    var intx = (b-b2)/(m2-m);
    var inty = (m2*intx)+b2;
    
    var a = dist(intx,inty,xo,yo);
    var b = dist(intx,inty,x1,y1);
    
    if (xo>intx) a = -a;
    if (x1>intx) b = -b;
    
    if (x1<x2) b=-b;
    
    if (y1>y2) a=-a;
    
    return new sPoint(-b,a);
}

function sPoint(x, y) {
    this.x = x;
    this.y = y;
}

function findPt(pt) {
    var retVal=0;
    
    while (pts[retVal]!=pt) retVal++;
    
    return retVal;
}

var ani=0;

var skele = new Skeleton(400, 225, 1, 1, 0, anima[0], anima[1]);

var bns = [];
var pts = [];
var pls = [new Poly(null,null,null,"#FFFFFF")];

var pnts = [];
var plys = [];

for (var i=0; i<Verts.length; i++) {
    pnts.push(new Point3(Verts[i][0], Verts[i][1], Verts[i][2]));
}

for (var i=0; i<Polys.length; i++) {
    plys.push(new Poly3(Polys[i][0], Polys[i][1], Polys[i][2], Polys[i][3], Polys[i][4], Polys[i][5], Polys[i][6]));
}

function compare(a, b) {
    return (b.depth) - (a.depth);
}

function init() {
    bns = [];
    pts = [];
    pls = [];

    for (var i=0; i<bones.length; i++) {
        bns.push(new Bone(bns[bones[i][0]], bns.length, bones[i][1], 1, 1, 1, bones[i][2]));
    }
    
    bns[0].parent = skele;
    
    for (var i=0; i<points.length; i++) {
        pts.push(new Point(points[i][0], points[i][1],bns[points[i][2]],0,bns[points[i][3]],0));
    }
    
    for (var i=0; i<polys.length; i++) {
        pls.push(new Poly(pts[polys[i][0]],pts[polys[i][1]],pts[polys[i][2]],polys[i][3]));
    }
}

init();

skele.bones = bns;
skele.points = pts;
skele.polys = pls;

context.lineWidth = 1;
context.lineCap="none";

for (var i=0; i<bns.length; i++) {
    bns[i].initalize();
}

for (var i=0; i<pts.length; i++) {
    pts[i].initalize();
}

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    for (var i=0; i<pnts.length; i++) {
        pnts[i].update();
        pnts[i].draw();
    }
    
    if (QKey) damt+=10;
    if (EKey) damt-=10;
    
    for (var i=0; i<plys.length; i++) {
        plys[i].update();
    }
    
    plys.sort(compare);
    plys.sort(compare);
    
    for (var i=0; i<plys.length; i++) {
        plys[i].draw();
    }

    context.fillStyle = 'black';

    skele.frame+=skele.speed;
    
    if (skele.frame>=(skele.frames.length-1)) {
        skele.frame=0;
    }
    
    if (skele.frame<0) {
        skele.frame=(skele.frames.length-1);
    }

    skele.update();
	skele.draw();

	Input();
    KeyPrev();
    MousePrev();
}

function changeCol(col, rc, gc, bc) {
    var r = col.substr(1,2);
    var g = col.substr(3,2);
    var b = col.substr(5,2);
    
    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    
    r += rc;
    g += gc;
    b += bc;
    
    if (r>255) r = 255;
    if (r<0) r = 0; 
    if (g>255) g = 255;
    if (g<0) g = 0; 
    if (b>255) b = 255;
    if (b<0) b = 0; 
    
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    
    if (r.length==1) r = '0' + r;
    if (g.length==1) g = '0' + g;
    if (b.length==1) b = '0' + b;
    
    return '#' + r + g + b;
}
	
var fps = 60;
setInterval(function () {
    draw();
}, 1000 / fps);

document.addEventListener("keydown", KeyDown, false);
document.addEventListener("keyup", KeyUp, false);
document.addEventListener("mousedown", MouseDown, false);
document.addEventListener("mouseup", MouseUp, false);
document.addEventListener("mousemove", MouseMove, false);
		