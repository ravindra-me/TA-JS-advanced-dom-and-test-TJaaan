let qutoesDiv = document.querySelector(".qutoes");



 function loadMore(){
    for(let i=0 ; i< 6; i++) {
       let div =  document.createElement("div");
       div.classList.add("qutoe");
       let h3 = document.createElement("h3");
       let p = document.createElement("p");
       h3.innerText = quotes[i].quoteText;
       p.innerText = quotes[i].quoteAuthor;
       div.append(h3,p);
       qutoesDiv.append(div);
    }
}

loadMore()

qutoesDiv.addEventListener('scroll', function() {
    console.log(qutoesDiv.scrollTop , qutoesDiv.clientHeight , qutoesDiv.scrollHeight)
    if (qutoesDiv.scrollTop + qutoesDiv.clientHeight >= qutoesDiv.scrollHeight) {
      loadMore();
    }
  });