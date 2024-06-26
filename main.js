
let api="AIzaSyA8sWmNlclmE_7YxglZIwbUU7duHFPEKA0";
let url = `https://www.googleapis.com/youtube/v3/videos?key=${api}&part=snippet&chart=mostPopular&maxResults=50&regionCode=IN`;



fetch(url)
.then((response)=>{
    return response.json();
})
.then((data)=>
{
    

   
    for(let i=0;i<data.items.length;i++)
    {
  
      getChannel(data.items[i]);
    
    }

    
})
.catch((err)=>{
    console.log(err);
})

function getChannel(data)
{
   fetch(`https://www.googleapis.com/youtube/v3/channels?key=${api}&part=snippet&id=${data.snippet.channelId}`)
   .then((res)=>{
     return res.json();
   })
   .then((res)=>{
    data.channelicon=res.items[0].snippet.thumbnails.high.url;
        

        showcard(data);
    
   })
}  

function showcard(data)
{
    let root=document.getElementsByClassName("video-container")[0];
   
      let watchURl=`https://www.youtube.com/watch?v=${data.id}`;

    root.innerHTML+=`<div class="video" onclick="location.href='${watchURl}'">

    <img src="${data.snippet.thumbnails.high.url } " class="thumbnail" alt="wrong" />
    <div class="content">
        <img src="${data.channelicon}" class="channel-icon" alt="wrong " />
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`
}

let sidebar=document.querySelector(".side-bar");
document.querySelector(".toggle-btn").addEventListener("click",()=>{
     sidebar.classList.toggle("small-side-bar")
    }
)
   
 // search bar
function search(input)
{
    let root=document.getElementsByClassName("video-container")[0];
    root.innerHTML="";
   
   console.log(input)
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${api}&q=${input}&part=snippet&chart=mostPopular&maxResults=50`)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
        console.log(data);
        for(let i=0;i<data.items.length;i++)
        {
            getChannel(data.items[i]);
         
        }
    })

}



const searchBtn=document.querySelector('.search-btn');
searchBtn.addEventListener('click',()=>{
    const searchinput=document.querySelector('.search-bar').value;
    search(searchinput);
    
    
})

const filters = document.querySelectorAll('.filter-options');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        search(filter.innerHTML);
    });
});


