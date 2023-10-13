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


let  addcolb = function(){Snap.load("/book.svg",function(f){
    let book = f.select("#in"),
        out = f.select("#out"),
        colb1 = s.group(book,out)
    s.append(colb1)
    colb1.drag();
    out.attr({
        fill:"red"
    })

    out.animate({fill:"blue"},3000,mina.ease);

}, s);
}
for(let i =0;i<3;i++){
    addcolb();
}   


// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })
