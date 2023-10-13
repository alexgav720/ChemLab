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

s.image("laba.jpg")

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
Snap.load("/colb.svg",function(f){
        petryin = f.select("#in")
        petryout = f.select("#out")
        petry = s.group(petryin,petryout)
    s.append(petry)
    petry.drag();
    petryin.attr({
        fill:"green"
    })
}, s);

let  addcolb = function(){Snap.load("/colb.svg",function(f){
    let colbin = f.select("#in"),
        colbout = f.select("#out"),
        colb1 = s.group(colbin,colbout)
    s.append(colb1)
    colb1.drag();
    colbin.attr({
        fill:"red"
    })

    colbin.animate({fill:"blue"},3000,mina.ease);

    colb1.mouseup(function() {
        if(isOverlap(colb1,petry)){
           petryin.animate({
                fill: "yellow"
            },3000,mina.ease)
        }
        colb1.attr({
            cx:10,
            cy:10})
    })
}, s);
}
for(let i =0;i<1;i++){
    addcolb();
}   


// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })
