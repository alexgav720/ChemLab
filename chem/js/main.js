let s = Snap('#main');

let square = s.rect(0,0,160,160);
let square2 = s.rect(0,0,160,160);
square.drag();  
square2.drag();  
s.load("untitled.svg",function(){})

s.attr({
    fill: 'green'
})



// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })

console.log(s);