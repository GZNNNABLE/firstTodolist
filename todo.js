var todoList = []
var currentTime = function(){
    var tm = new Date().toLocaleDateString()
    return tm
}
var toggleClass = function(element,className){
    if(element.classList.contains(className)){
        element.classList.remove(className)
    }else{
        element.classList.add(className)
    }
}
var indexOfElement = function(element){
    var cell = element.parentElement
    console.log(cell.children)
    for(var i =0;i<cell.children.length;i++){
        if (cell.children[i]===element){
            console.log(i)
            return i
        }
    }
}
var bindEventAdd = function(){
    var addBottom = document.querySelector(".addBtn").addEventListener("click",function(){
        var task = document.querySelector(".input").value
        console.log(task)
        if(task ===""){
            alert("禁止为空")
        }else{
            var todo={
                'task' : task,
                'time' : '——time is'+currentTime()
            }
            todoList.push(todo)
            console.log(todoList)
            insertTodo(todo)

        }
    })
    
}
var bindEventButton =function(){
    var todoContainer = document.querySelector(".todoContainer")
    todoContainer.addEventListener("click",function(event){
        var target = event.target
        console.log(target)
        if(target.classList.contains("todo-done")){
            var cell = target.parentElement
            toggleClass(cell,"done")
        }else if(target.classList.contains("todo-edit")){
            var cell = target.parentElement
            var position = cell.children[0]
            position.setAttribute("contenteditable",'true')
        }else if(target.classList.contains("todo-delete")){
            var cell = target.parentElement
            var index = indexOfElement(target.parentElement)
            cell.remove()
            todoList.splice(index,1)
            
        }
    })
}
var bindEventBlur = function(){
    var todoBlur = document.querySelector('.todoContainer')
    todoBlur.addEventListener('blur',function(event){
        var target = event.target
        console.log(target)
        if(target.classList.contains('todo-label')){
            target.setAttribute("contenteditable",'false')
        }
    },true)
}
var insertTodo = function(todo){
    var todoContainer = document.querySelector(".todoContainer")
    console.log(todoContainer)
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend',t)
}


var templateTodo = function(todo){
    var t =`
    <div class='todo-cell'>
    <input class="focus" type="checkbox" name="check">
    
    <span class='todo-label' contenteditable='false'>${todo.task}</span>
    <span class='todo-date-time'>${todo.time}</span>
    <button class='todo-done'>完成</button>
    <button class='todo-edit'>编辑</button>
    <button class='todo-delete'>删除</button>

</div>
    `
    return t
} 
var checkAll = function(){
    addEventListener("click",function(){
        var flag=document.getElementById("allChecks").checked;
        var cks=document.getElementsByName("check")
        
        if(flag){
		for(var i=0;i<cks.length;i++){
			cks[i].checked=flag;}}
    })
}
var noneCheck = function(){
    addEventListener("click",function(){
        var flag=document.getElementById("noneCheck").checked;
        var cks=document.getElementsByName("check")
        
        if(flag)
		for(var i=0;i<cks.length;i++){
			cks[i].checked=false;}
    })
}
var deleteAllCheck = function(){
   
    var cks = document.getElementsByName("check")

    console.log(cks.length)
    for(var i=cks.length-1;i>=0;i--){
        if(cks[i].checked){
            console.log(cks[i].checked)
            var par =cks[i].parentElement
            console.log(par)
            par.remove()




            
            
    }
}
}
//     var item = $(".focus:checked")
//     var len = items.length
//     for (var i=0;i<len;i++){
//         $(items[i]).parents(".item").remove()
//     }
// }

  
bindEventAdd()
bindEventButton()
bindEventBlur()
checkAll()
noneCheck()
