document.addEventListener("DOMContentLoaded", () => {

    const newQuote = document.querySelector("#newQuote");
    const tweet = document.querySelector("#tweet");
    const quote = document.querySelector("blockquote")
    const author = document.querySelector("span")
    const tags = document.querySelector("input");
    
    async function updateQuote() {
        if(tags.value != null){
            searchByTags(tags.value);
        } else {
        var response = await fetch("https://api.quotable.io/random")
        var data  = await response.json();

        if(response.ok){
            quote.textContent = data.content;
            author.textContent = data.author;
        } else {
            quote.textContent = "An error occured"
        }
        }
    }

    async function searchByTags(tags)  {
        var response = await fetch("https://api.quotable.io/random?tags=" + tags)
        var data = await response.json();

        if(response.ok) {
            quote.textContent = data.content;
            author.textContent = data.author;
        } else {
            quote.textContent = "No Quote(s) by this tag(s)!"
        }
    }

    function tweetQuote() { 
        window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "  " + "- " + author.innerHTML,
         "Tweet Window", "width=600, height=300")
        };

        newQuote.addEventListener("click", updateQuote);
        tweet.addEventListener("click", tweetQuote)
        tags.addEventListener("keydown", (ele) => {
            if(ele.key == "Enter") {
               searchByTags(tags.value)
            }
        });

        updateQuote();
});