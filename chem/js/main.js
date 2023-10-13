let s = Snap('#main');
let paper = Snap(200,200);
let square = s.rect(0,0,160,160);

paper.drag();
square.drag();  
square2.drag();  

Snap.load("/untitled.svg",function(f){
    // let paper = Snap('#star');   
    paper.append(f)


})

s.append(paper)
square.attr({
    fill: 'green'
})



// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })

console.log(s);