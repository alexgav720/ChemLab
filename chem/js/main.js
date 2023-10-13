let s = Snap('#main');
let square = s.rect(0,0,160,160);

square.drag();  

Snap.load("/book.svg",function(f){
    g = f.selectAll("#book");
    s.append(g);
    
    
})
let paper = Snap("#book");
s.append(paper)
paper.drag();


// Snap.load(img,function(f){
//     g = f.selectAll("polygon");
//     s.append(g);
// })

console.log(s);