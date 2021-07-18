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
    if (todoMonth > 12 || todoMonth < form.children[1].min ){
        alert("Please Enter right Month!")
        console.log(todoMonth)
        console.log(form.children[1].max)
        console.log(form.children[1].min)
        return;
    }
    if (todoDate > form.children[2].max || todoDate < form.children[2].min ){
        alert("Please Enter right Date!")
        
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
            
        //remove from local storage
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));

        myListArray.forEach((item , index) => {
            if(item.todoText == text){
                myListArray.splice(index,1);
                localStorage.setItem("list" , JSON.stringify(myListArray));
            }
        })

        todoItem.remove();
        })

        
    })

    //todo 把兩個icon append進去
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);
    //style.scss keyframes -> scaleUp 動畫效果
    todo.style.animation = "scaleUp 0.8s forwards"

    //create an object ->
    let myTodo = {
        todoText : todoText,
        todoMonth : todoMonth,
        todoDate : todoDate
    };
    //test
    //store data into an array of objects
    let myList = localStorage.getItem("list")
    if (myList == null) {
        //把上面建立的obj 放進來
        localStorage.setItem("list" , JSON.stringify([myTodo]))
    } else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")))

    form.children[0].value = ""; //clear text 把打過字的欄位清空
    //再把todo放進去section裡面
    section.appendChild(todo);


})
loadData();


function loadData(){
//Get localStorage
let myList = localStorage.getItem("list");

if (myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        
        //create a to do
        let todo = document.createElement("div");
        todo.classList.add("todo");
        //text
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        //time
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + "/" + item.todoDate;
        //最後再放回todo裡面;
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

        //trash button
        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        trashButton.addEventListener("click" , e =>{

        let todoItem = e.target.parentElement;
        
        todoItem.style.animation = "scaleDown 0.3s forwards";
        
        //再加上一個eventListener，當動畫跑完後才remove
        todoItem.addEventListener("animationend" , ()=>{
            //remove from local storage
            let text = todoItem.children[0].innerText; //childen [0] 就是取文字text
            console.log(text)
            let myListArray = JSON.parse(localStorage.getItem("list"));

            myListArray.forEach((item , index) => {
                if(item.todoText == text){
                    myListArray.splice(index,1);
                    localStorage.setItem("list" , JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
        })

        
    })  
        //把兩個button 塞進todo裡面
        todo.appendChild(completeButton);
        todo.appendChild(trashButton);
        //最後再把section塞 todo進去
        section.appendChild(todo);
        })
    }
}

//sort time bu merge
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < arr1.length && j < arr2.length) {
      if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
        result.push(arr2[j]);
        j++;
      } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
        result.push(arr1[i]);
        i++;
      } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
        if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
          result.push(arr2[j]);
          j++;
        } else {
          result.push(arr1[i]);
          i++;
        }
      }
    }
  
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
  
    return result;
  }
  
  function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, arr.length);
      return mergeTime(mergeSort(right), mergeSort(left));
    }
  }

  let sortButton = document.querySelector("div.sort button");

  sortButton.addEventListener("click" , () => {
    //sort Data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    //soty Data 排序完後再重新放進去
    localStorage.setItem("list" , JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    //一直把第一個刪除
    for (let i  = 0 ; i < len ; i++){
        section.children[0].remove();
    }
    //loadData
    loadData();
  })
  