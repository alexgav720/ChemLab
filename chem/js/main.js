class chemElement{
    color;
    name;
    constructor(color, name){
        this.color = color;
        this.name = name;
    }
    append(element){
        this.name += element.name + " ";
    }
}

let mix = function(elementName){
    switch(elementName){
        case "HCl ":
            return "blue"
        case "AgNO3 ":
            return "blue"
        case "FeCl3 ":
            return "yellow"
        case "HCl AgNO3 ":
            return "green"
        
    }
}

let s = Snap('#main');

s.image("back.jpg",0,250,1900,720)
s.image("shkaf.jpg",0,0,1900,300)


function isOverlap(element1, element2) {
    var bbox1 = element1.getBBox();
    var bbox2 = element2.getBBox();

    // Check for overlap by comparing bounding boxes
    return (
        bbox1.x < bbox2.x + bbox2.width &&
        bbox1.x + bbox1.width > bbox2.x &&
        bbox1.y < bbox2.y + bbox2.height &&
        bbox1.y + bbox1.height > bbox2.y
    );
}
let petry;
let petryin;
Snap.load("/petry.svg",function(f){
        petryin = f.select("#in")
        petryout = f.select("#out")
        lines = f.select("#lines")
        petry = s.group(petryout,petryin,lines)
    petryin.element = new chemElement("", "");
    s.append(petry)
    petryin.attr({
        fill:"lightblue"
    })
    petry.attr({
        transform: "translate(" + 885 + ", " + 280 + ")"
      });
}, s);

let  addcolb = function(startx,starty,element){Snap.load("/newColb.svg",function(f){
    let colbin = f.select("#in"),
        colbout = f.select("#out"),
        text = f.select("#text"),
        colb1 = s.group(colbout,colbin,text)
    colb1.element = element;
    text.attr("text", element.name);
    s.append(colb1)
    colb1.drag();
    colbin.attr({
        fill: element.color
    })
    colb1.attr({
        transform: "translate(" + startx + ", " + starty + ")"
      });
    
      let elementAmount = 0;
    colb1.mouseup(function() {
        if(isOverlap(colb1,petry)){
        petryin.element.append(colb1.element);
        console.log(colb1.element, petryin.element);
        elementAmount = petryin.element.name.split(" ")
            if(elementAmount>4){
            }

                petryin.animate({
                    fill: mix(petryin.element.name)
                },2000,mina.easeinout)
        }
       
            colb1.animate({transform: "translate(" + startx + ", " + starty + ")"},500,mina.ease)
         
    })

}, s);
}
let x =250;
let y =75;

let elements = [
    new chemElement("blue","HCl"),
    new chemElement("blue","AgNO3"),
    new chemElement("yellow","FeCl3")
    ]
for(let elem of elements){
    addcolb(x,y, elem);
    x+=150
}


