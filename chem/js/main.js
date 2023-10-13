let s = Snap('#main');
// s.append(paper)
// let img = s.image("/untitled.svg",10,10,100,100)
// img.drag()


// // potom

// let rect = paper.rect(0,0,100,100)
// let group = paper.group(img,rect);

// Reusable drag function
// function makeDraggable(element) {
//     element.drag(
//         function (dx, dy, x, y) {
//             this.attr({
//                 transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
//             });
//         },
//         function () {
//             this.data('origTransform', this.transform().local);
//         }
//     );

//     // Additional styles (optional)
//     element.attr({ cursor: 'move' });
// }

s.image("back.jpg")

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
Snap.load("/newColb.svg",function(f){
        petryin = f.select("#in")
        petryout = f.select("#out")
        petry = s.group(petryout,petryin)
    s.append(petry)
    petry.drag();
    petryin.attr({
        fill:"green"
    })
    petry.attr({
        transform: "translate(" + 500 + ", " + 500 + ")"
      });
}, s);

let  addcolb = function(startx,starty){Snap.load("/newColb.svg",function(f){
    let colbin = f.select("#in"),
        colbout = f.select("#out"),
        colbtext = f.select("#text"),
        colb1 = s.group(colbout,colbin,colbtext)
    s.append(colb1)
    colb1.drag();
    colbin.attr({
        fill:"red"
    })
    colb1.attr({
        transform: "translate(" + startx + ", " + starty + ")"
      });
    // colbin.animate({fill:"blue"},3000,mina.ease);

    colb1.mouseup(function() {
        if(isOverlap(colb1,petry)){
           petryin.animate({
                fill: "yellow"
            },2000,mina.ease)
            // colb1.animate({angle:"90"},1000,mina.ease)
        }
       
            colb1.attr({
              transform: "translate(" + startx + ", " + starty + ")"
            });
         
    })

}, s);
}
let x =10;
let y =10;
for(let i =0;i<3;i++){
    addcolb(x,y);
    x+=150
}   


// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })
