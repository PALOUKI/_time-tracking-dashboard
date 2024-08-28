$(document).ready(function(){
    
    const colors= {
        work : "hsl(15, 100%, 70%)",       
        play : "hsl(195, 74%, 62%)",       
        study : "hsl(348, 100%, 68%)",      
        exercise : "hsl(145, 58%, 55%)",      
        social : "hsl(264, 64%, 52%)",          
        selfcare : "hsl(43, 84%, 65%)"       
      }

    /* init grid generating card with daily */
    async  function initCard(){
        const response= await fetch("data.json");
        const data= await response.json();
        data.forEach(item => {
            let { title, timeframes }= item;
            let { current, previous }= timeframes.daily
            generateCard(title, current, previous);
        });
    };
    
    /* update grid generating card onclick on daily or weekly or monthly */
    async function updateCard(){
        const response= await fetch("data.json");
        const data= await response.json();
        $(document).on("click", "li", function(){
            
            $("li").removeClass("active");
            $(this).addClass("active")
            $(".gridContainer").empty();
           
            data.forEach(item => {
                let { title, timeframes }= item;
                let { current, previous }= timeframes[$(this).text().toLowerCase()]
                /* title in Json file and title.charAt(0).toUpperCase() + title.slice(1) here are the same*/
                generateCard(title.charAt(0).toUpperCase() + title.slice(1), current, previous); 
                
            });
            
        })

    }

    /* function to generate grid Items */
    function generateCard(title, current, previous){
        const color= colors[
        	title.toLowerCase().replace(" ", "")
        ]
       
        let $gridContainer=$(".gridContainer")
        let $gridItem=$('<div>',{
            class: "gridItem"
        });
        let $img=$('<img>',{
            class: "bgImg",
            alt: "image",
            src: `images/icon-${title.toLowerCase().replace(" ","-")}.svg`
        });
        let $gridItemDesc=$('<div>',{
            class: "gridItemDesc"
        });
        let $divTitle=$('<div>',{
            class: "divTitle"
        });
        let $title=$('<div>',{
            class: "title",
            text: `${title}`
        });
        let $divTitleImgContainer=$('<div>',{
            class: "divTitleImgContainer",
        });
        let $divTitleImg=$('<img>',{
            class: "divTitleImg",
            src: "images/icon-ellipsis.svg"
        });
        let $divTime=$('<div>',{
            class: "divTime"
        });
        let $h1Time=$('<h1>',{
            class: "h1Time",
            text: `${current}hrs`
        });
        let $pTime=$('<p>',{
            class: "pTime",
            text: `Last week - ${previous}hrs`
        });

        /*  adding gridItem Colors  */
        if(color){
            $gridItem.css("background-color", color)
        }

        /* making the grid structure */
        $gridContainer.append($gridItem)
        $gridItem.append($img)
        $gridItem.append($gridItemDesc)
        $gridItemDesc.append($divTitle)
        $divTitle.append($title)
        $divTitle.append($divTitleImgContainer)
        $divTitleImgContainer.append($divTitleImg)
        $gridItemDesc.append($divTime)
        $divTime.append($h1Time)
        $divTime.append($pTime)

    };

    initCard()
    updateCard()
    
    
  



});
