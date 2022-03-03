class Select{
    constructor(x,y,w,h,isActive){
        this.x = x,
        this.y = y,
        this.w = w,
        this.h = h,
        this.isActive = isActive
    }

    draw(){
        if(selectMode){
            let w = mouseX - this.x
            let h = mouseY - this.y
            
            fill(173,216,239);
            rect(this.x,this.y,w,h)
            fill(255,255,255,0);
            this.addSelectedGates(w,h)

        }
        
    }
    released(){
        selects = []
        selectMode = false

    }

    addSelectedGates(w,h){
        let all = [...currentGates,...currentIOs,...currentNodes,...currentWires]
        let absX = mouseX > this.x ? this.x : mouseX
        let absY = mouseY > this.y ? this.y : mouseY
        
        w = Math.abs(w)
        h = Math.abs(h)

        for (let i = 0; i < all.length; i++) {
            const element = all[i];
            if (element.x < absX + w &&
                element.x + element.width > absX &&
                element.y < absY + h &&
                element.height + element.y > absY) {
                    selected.includes(element) ? null : selected.push(element)  
                    element.rollover = true
                
            }

            


           
            




            
        }
    }

}