function c4piece(i, j, d) {
    this.i = i;
    this.j = j;
    this.x = (i * d*1.2)+d;
    this.y = (j * d*1.2)+d;
    this.d = d;

    
    this.empty = true;
    
    this.red = false;
    this.black = false;

}

c4piece.prototype.show = function() {


   if (this.red){
        fill(255,0,0);
        noStroke();
        circle(this.x, this.y, this.d);
    }
    else if (this.black) {
        fill(0);
        noStroke();
        circle(this.x, this.y, this.d);
    }
    else {
        fill(255);
        noStroke();
        circle(this.x, this.y, this.d);
    }

    

};