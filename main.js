let c=document.getElementById("mycanvas");
let ctxt=c.getContext("2d");

let loadImage=(src, callback)=>{
    let img=document.createElement("img");
    img.onload=()=>callback(img);
    img.src=src;
};

let imagePath=(frameNumber, animation)=>{
    return "images/"+animation+"/"+frameNumber+".png";
};

let frames={
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    backward: [1,2,3,4,5,6],
    forward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9],   
};

let loadImages=(callback)=>{
    let images={idle: [], kick: [], punch: [], backward: [], forward: [], block: []};
    let imagesToLoad=0;
    ["idle","kick","punch", "backward", "forward", "block"].forEach((animation)=>{
        let animationFrames=frames[animation];
        imagesToLoad=imagesToLoad+animationFrames.length;

        animationFrames.forEach((frameNumber)=>{
            let path=imagePath(frameNumber, animation);
             loadImage(path,(image)=>{
        images[animation][frameNumber-1]=image;
        imagesToLoad=imagesToLoad-1;
        if(imagesToLoad===0)
        {
            callback(images);
        }
       });
    });  
  });
};
let x=500, y=700;
let animate=(ctxt,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctxt.clearRect(x,y,400,400);
            if(animation==="backward"){
                x=x-10;
            }
            else if(animation==="forward"){
                x=x+10;
            }
            ctxt.drawImage(image,x,y,400,400);
        }, index*100);
    });
    setTimeout(callback, images[animation].length*100);
};

loadImages((images)=>{
    let queuedAnimation = [];

    let aux=()=>{
        let selectedAnimation;
        if(queuedAnimation.length===0){
            selectedAnimation="idle";
        }
        else{
            selectedAnimation=queuedAnimation.shift();
        }
        animate(ctxt,images,selectedAnimation,aux);
    };
    aux();
    document.getElementById("kick").onclick=()=>{
        queuedAnimation.push("kick");
    };
    document.getElementById("punch").onclick=()=>{
        queuedAnimation.push("punch");
    };
    document.getElementById("backward").onclick=()=>{
        queuedAnimation.push("backward");
    };
    document.getElementById("forward").onclick=()=>{
        queuedAnimation.push("forward");
    };
    document.getElementById("block").onclick=()=>{
        queuedAnimation.push("block");
    };

    document.addEventListener("keyup",(event)=>{
        const key=event.key;
        if(key==="ArrowLeft"){
            queuedAnimation.push("backward");
        }else if(key==="ArrowRight"){
            queuedAnimation.push("forward");
        }else if(key==="ArrowUp"){
            queuedAnimation.push("punch");
        }else if(key==="ArrowDown"){
            queuedAnimation.push("kick");
        }else if(key==="Enter"){
            queuedAnimation.push("block");
        }
    });
});
