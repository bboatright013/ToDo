
const submitBtn = document.querySelector(".subButton");
const inputVal = document.querySelector("#inputVal");
const form = document.querySelector("form");
const theList = document.querySelector(".theList");
let backlog = [];
const save = document.querySelector("#save");
const clear = document.querySelector("#clear");


if(localStorage.getItem("list") !== null){
    backlog = JSON.parse(localStorage.getItem("list"));
    for(let i = 0; i <backlog.length; i++){
        let newli = document.createElement("li");
        newli.innerHTML =  `<input type="checkbox"><span> ${backlog[i]}</span> <span class="delete">Remove</span>`;
        theList.append(newli);
        newli.setAttribute('data-id', i);

    }
}

form.addEventListener("click", function(e){
    e.preventDefault();
});
form.addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        if(inputVal.value === null || inputVal.value === ''){
            return;
        }
        let newli = document.createElement("li");
        newli.innerHTML =  `<input type="checkbox"><span> ${inputVal.value} </span><span class="delete">Remove</span>`;
        theList.append(newli);
        newli.setAttribute('data-id', backlog.length);
        backlog.push(inputVal.value);
        inputVal.value = '';
        console.log(backlog);
    }

});
submitBtn.addEventListener("click", function(e){
    if(inputVal.value === null || inputVal.value === ''){
        return;
    }
    let newli = document.createElement("li");
    newli.innerHTML =  `<input type="checkbox"> <span>${inputVal.value}</span> <span class="delete">Remove</span>`;
    theList.append(newli);
    newli.setAttribute('data-id', backlog.length);
    backlog.push(inputVal.value);
    inputVal.value = '';
    console.log(backlog);
});

save.addEventListener("click", function(e){
    localStorage.setItem("list", JSON.stringify(backlog));
    let displayTodos = document.querySelectorAll("li");
    for(let i = 0; i < backlog.length ; i++){
        displayTodos[i].setAttribute('data-id', i);
    }
});

clear.addEventListener("click", function(e){
    for(let todo of backlog){
        backlog.pop();
    }
    theList.innerHTML = ' ';
    localStorage.clear();
});

theList.addEventListener("click", function(e){
    console.log(e);
    if(e.target.tagName === "INPUT"){
    e.target.nextElementSibling.classList.toggle("completed");
    }
    if(e.target.className === "delete"){
       let findIndex = e.target.parentElement.getAttribute('data-id');
       console.log(findIndex);
       console.log(backlog[findIndex]);
        backlog.splice(findIndex, 1);
        e.target.parentElement.remove();
        
    }
});

