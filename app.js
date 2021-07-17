let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click" , e => {
    // prvent form form being submitted; 避免被提交出去
    e.preventDefault();

    //get the input value;
    let form = e.target.parentElement; //就是<form>
    let todoText = form.children[0].value; //取得第一個的值
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    //console.log(todoText , todoMonth , todoDate);

    // todoText 不能是空白的，並直接return掉
    if (todoText === ""){
        alert("Please Enter some Text !");
        return;
    }

    //create a todo item
    let todo = document.createElement("div"); //創造一個最外層div
    todo.classList.add("todo") //增加一個class叫todo
    
    let text = document.createElement("p");
    text.classList.add("todo-text") //增加一個class叫todo text
    text.innerText = todoText

    let time = document.createElement("p")
    time.classList.add("todo-time") //增加一個class叫todo text
    time.innerText = todoMonth + "/" + todoDate;

    //再把 p element 在加回去 todo 裡面
    todo.appendChild(text);
    todo.appendChild(time);

    //create green check and red trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    
    completeButton.addEventListener("click",e =>{
        let todoItem =  e.target.parentElement;
        todoItem.classList.toggle("done") //class done有做效果 
                           //toggle有的話刪除，沒有就加進去
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.addEventListener("click" , e =>{

        let todoItem = e.target.parentElement;
        
        todoItem.style.animation = "scaleDown 0.3s forwards";
        
        //再加上一個eventListener，當動畫跑完後才remove
        todoItem.addEventListener("animationend" , ()=>{
            todoItem.remove();
        })

        
    })

    //todo 把兩個icon append進去
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);
    //style.scss keyframes -> scaleUp 動畫效果
    todo.style.animation = "scaleUp 0.8s forwards"

    form.children[0].value = ""; //clear text 把打過字的欄位清空
    //再把todo放進去section裡面
    section.appendChild(todo);


})