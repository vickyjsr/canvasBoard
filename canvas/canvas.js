
    const canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d"); // ctx refers to context 
    
    canvas.height = window.innerHeight-120;
    canvas.width = window.innerWidth;
    
    // variables 
    let painting = false,paint=false;
    let drawcolor = "black";
    let linewidth = "2";
    let undoarray = [];
    let index = -1;

    function startposition()
    {
        painting = true;
        draw(e);
    }
    function endposition()
    {
        painting = false;
        ctx.beginPath();
        undoarray.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
        console.log(undoarray);
    }

    function draw(e)
    {
        if(!painting)return;
        paint=true;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle=drawcolor;
        ctx.lineWidth=linewidth;
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }
    
    function clearCanvas()
    {
        if(!paint)return;
        var m = confirm("Want to clear");
        if(m)
        {
            paint=false;
            canvas.height = window.innerHeight-120;
            canvas.width = window.innerWidth;
            undoarray=[];
            index = -1;
            painting = false,paint=false;
            pen();
        }
    }
    
    function undo()
    {
        if(index<=0)
        {
            paint=false;
            canvas.height = window.innerHeight-120;
            canvas.width = window.innerWidth;
            undoarray=[];
            index = -1;
            painting = false,paint=false;
            pen();
            return;
        }
        undoarray.pop();
        index-=1;
        // console.log(imgData);
        ctx.putImageData(undoarray[index],0,0);
    }
    let temp=drawcolor,lw=linewidth;
    function eraser()
    {
        if(!paint)
        {
            pen();
            return;
        }
        drawcolor="white";
        linewidth=6;
    }
    function pen()
    {
        linewidth=lw;
        drawcolor=temp;
    }
    // eventlisteners
    canvas.addEventListener('mousedown',startposition);
    canvas.addEventListener('mouseup',endposition);
    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('touchdown',startposition);
    canvas.addEventListener('touchup',endposition);
    canvas.addEventListener('touchmove',draw);

    