class chemElement{
    color;
    name;
    constructor(color, name){
        this.color = color;
        this.name = name;
    }
    append(element){
        // он вообще должен быть абстрактным
        this.name += element.name + " ";
    }
}

class TooManyElements extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
class IncorrectReaction extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

class AgNO3 extends chemElement {
    constructor(color){
        // можно какой цвет по умолчанию давать
        super(color, "AgNO3");
    }
    append(element) {
       if (element instanceof HCl){
        return [ new HNO3(), new AgCl(), `AgNO3 + HCl = AgCl(осадок белого цвета) + HNO3`];
       }
       if (element instanceof FeCl3){
        return [ new FeNO3, new AgCl(),`3AgNO3 + FeCl3 = Fe(NO3)3 + 3AgCl(осадок белого цвета)`];
       }
    }
}

class FeNO3 extends chemElement {
    constructor(color){
        super(color ?? "rgba(0, 0, 250, 0.1)", "FeNO3");
    }
}


class HCl extends chemElement {
    constructor(color){
        super(color, "HCl");
    }
    append(element) {
       if (element instanceof AgNO3){
        return [ new HNO3(), new AgCl(), `AgNO3 + HCl = AgCl(осадок белого цвета) + HNO3`];
       }
       if (element instanceof FeCl3){
        throw new IncorrectReaction(`FeCl3 + HCl = X - Реакция не идет`);
       }
    }
}

class FeCl3 extends chemElement {
    constructor(color, name){
        super(color, name ?? "FeCl3");
    }
    append(element) {
       if (element instanceof AgNO3){
        return [ new FeNO3, new AgCl(), "3AgNO3 + FeCl3 = Fe(NO3)3 + 3AgCl(осадок белого цвета)"];
       }
       if (element instanceof HCl){
        throw new IncorrectReaction(`FeCl3 + HCl = X - #Реакция не идет`);
       }
    }
}

class AgCl extends chemElement {
    constructor(color){
        super(color ?? "white", "AgCl");
    }
}

class HNO3 extends chemElement {
    constructor(color){
        super(color ?? "rgba(0, 0, 250, 0.1)", "HNO3");
    }
}

class Mixer {
    elements = [];
    clear() {
        this.elements = [];
    }

    mix(element){
        if (this.elements.length ===0){
            this.elements.push(element);
        } else if (this.elements.length === 1) {
            this.elements = this.elements[0].append(element);
        } else {
            throw new TooManyElements('Not allowed to make more than 2 items');
        }
    }
    getColor(){
        if (this.elements.length === 0){
            return "lightblue";
        } else if (this.elements.length === 1) {
            return this.elements[0].color;
        } else {
            return s.gradient(`l(1, 0, 1, 1)${this.elements[0].color}-${this.elements[0].color}:80-${this.elements[1].color}:80-${this.elements[1].color}`)
        }
    }

    getFormula() {
        if (this.elements.length === 0){
            return "";
        } else if (this.elements.length === 1) {
            return `${this.elements[0].name} + `;
        } else {
            return this.elements[2];
        }

    }
}

let s = Snap('#main');

//добавление картинок и текста
s.image("back.jpg",190,290,1600,640)
s.image("shkaf.jpg",0,0,1900,300)
let frmltext = s.text(1000,450,".")
frmltext.attr({
    fontSize: 28  
})

//функция для проверки наложения
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

//создаём статичную чашку
let petry;
let petryin;
Snap.load("./petry.svg",function(f){
        petryin = f.select("#in")
        petryout = f.select("#out")
        lines = f.select("#lines")
        petry = s.group(petryout,petryin,lines)
    petryin.mixer = new Mixer();
    s.append(petry)
    petryout.attr({
        fill: "grey",
        fillOpacity: .8,
    })
    petryin.attr({
        fill:petryin.mixer.getColor(),
    })
    petry.attr({
        transform: "translate(" + 750 + ", " + 280 + ")"
      });

      petry.dblclick(function(){
        petryin.mixer.clear();
        petryin.attr({fill:petryin.mixer.getColor()});
        frmltext.attr("text", petryin.mixer.getFormula());
    })
}, s);

//функция для добавления двигающихся колб
let  addcolb = function(startx,starty,element){Snap.load("./newColb.svg",function(f){
    let colbin = f.select("#in"),
        colbout = f.select("#out"),
        text = f.select("#text"),
        colb1 = s.group(colbout,colbin,text)
    colb1.element = element;
    text.attr("text", element.name);
    s.append(colb1)
    colb1.drag();
    colbout.attr({
        fill: "grey",
        fillOpacity: .8,
    })
    colbin.attr({
        fill: element.color
    })
    colb1.attr({
        transform: "translate(" + startx + ", " + starty + ")"
      });
    
    colb1.mouseup(function() { 
        if(isOverlap(colb1,petry)){
            try {
            petryin.mixer.mix(colb1.element);
            frmltext.attr("text", petryin.mixer.getFormula());
            console.log(petryin.mixer.elements)
            

            petryin.animate({
                "fill-opacity": 0
              }, 1000, function() {
                petryin.attr({
                  fill: petryin.mixer.getColor()
                });
                // Animate the fill-opacity to 1
                petryin.animate({
                  "fill-opacity": 1
                }, 1500);
              });
            } catch(e){
                if (e instanceof TooManyElements){
                    console.log(e.message);
                    //TODO - draw red cross here for some time
                }
                if (e instanceof IncorrectReaction){
                    console.log(e.message);
                    frmltext.attr("text", e.message);
                }
            }
        }
            colb1.animate({transform: "translate(" + startx + ", " + starty + ")"},500,mina.ease)
    })

}, s);
}

//добавление колб
let x =250;
let y =75;

let elements = [
    new HCl("rgba(97, 115, 242, 0.8)"),
    new AgNO3("rgba(125, 122, 250, 0.8)"),
    new FeCl3("rgba(235, 234, 40, 0.8)")
    ]
for(let elem of elements){
    addcolb(x,y, elem);
    x+=150
}















// let mix = function(elementName){
//     switch(elementName){
//         case "HCl ":
//             return "blue"
//         case "AgNO3 ":
//             return "blue"
//         case "FeCl3 ":
//             return "yellow"
//         case "HCl AgNO3 ":
//             return "green"
        
//     }
// }

// let s = Snap('#main');

// //добавление картинок и текста
// s.image("back.jpg",190,290,1600,720)
// s.image("shkaf.jpg",0,0,1900,300)
// let frmltext = s.text(1300,420,"text")
// frmltext.attr({
//     transform: 's4'  
// })


// //функция для проверки наложения
// function isOverlap(element1, element2) {
//     var bbox1 = element1.getBBox();
//     var bbox2 = element2.getBBox();

//     // Check for overlap by comparing bounding boxes
//     return (
//         bbox1.x < bbox2.x + bbox2.width &&
//         bbox1.x + bbox1.width > bbox2.x &&
//         bbox1.y < bbox2.y + bbox2.height &&
//         bbox1.y + bbox1.height > bbox2.y
//     );
// }



// //создаём статичную чашку
// let petry;
// let petryin;
// Snap.load("/petry.svg",function(f){
//         petryin = f.select("#in")
//         petryout = f.select("#out")
//         lines = f.select("#lines")
//         petry = s.group(petryout,petryin,lines)
//     petryin.element = new chemElement("", "");
//     s.append(petry)
    // petryout.attr({
    //     fill: "grey",
    //     fillOpacity: .8,
    // })
//     petryin.attr({
//         fill: s.gradient("L(0, 0, 100, 100)#000-#f00:25-#fff")
//     })
//     petry.attr({
//         transform: "translate(" + 885 + ", " + 280 + ")",
//       });
    //   petry.dblclick(function(){
    //     petryin.attr({fill:"lightblue"})
    //     petryin.element = new chemElement("", "");
    //     frmltext.attr("text", "");
    // })

// }, s);

// //функция для добавления двигающихся колб
// let elementAmount = 0;
// let  addcolb = function(startx,starty,element){Snap.load("/newColb.svg",function(f){
//     let colbin = f.select("#in"),
//         colbout = f.select("#out"),
//         text = f.select("#text"),
//         colb1 = s.group(colbout,colbin,text)
//     colb1.element = element;
//     text.attr("text", element.name);
//     s.append(colb1)
//     colb1.drag();
    // colbout.attr({
    //     fill: "grey",
    //     fillOpacity: .8,
    // })
//     colbin.attr({
//         fill: element.color
//     })
//     colb1.attr({
//         transform: "translate(" + startx + ", " + starty + ")"
//       });
    

//     colb1.mouseup(function() {
//         if(isOverlap(colb1,petry)){
//         petryin.element.append(colb1.element);
//         console.log(colb1.element, petryin.element);
//         elementAmount = petryin.element.name.split(" ").length
//             if(elementAmount<4){
                
//                 petryin.animate({
//                     fill: mix(petryin.element.name),
//                 },2000,mina.easeinout)
//                 frmltext.attr("text", petryin.element.name);
//             }
//         }
       
//             colb1.animate({transform: "translate(" + startx + ", " + starty + ")"},500,mina.ease)
         
//     })

// }, s);
// }
// let x =250;
// let y =75;
// //добавление колб
// let elements = [
//     new chemElement("blue","HCl"),
//     new chemElement("blue","AgNO3"),
//     new chemElement("yellow","FeCl3")
//     ]
// for(let elem of elements){
//     addcolb(x,y, elem);
//     x+=150
// }


