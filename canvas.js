window.addEventListener("load",() =>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d"); // ctx refers to context 
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    // variables 
    let painting = false;

    function startposition()
    {
        painting=true;
        draw(e);
    }
    function endposition()
    {
        painting=false;
        ctx.beginPath();
    }
    function draw(e)
    {
        if(!painting)return;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("fillColor");
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }

    // eventlisteners
    canvas.addEventListener('mousedown',startposition);
    canvas.addEventListener('mouseup',endposition);
    canvas.addEventListener('mousemove',draw);

    
    
});

function changeLineWidth() {
    ctx.lineWidth = this.value;
    event.stopPropagation();
}

window.addEventListener("resize",() =>{
    
    // const canvas = document.querySelector("#canvas");
});