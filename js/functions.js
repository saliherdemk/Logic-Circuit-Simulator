const deleteButton = document.querySelector(".delete-btn")

function drawForElements(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i].draw()
    }

}

function pressedActionForElements(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i].pressed()
        arr[i].delete()

    }
}

function releasedActionForElements(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i].released()
    }
}



function changeValueActionForElements(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i].changeValue()
    }
}

function toggleDeleteMode(){
    deleteMode = !deleteMode
    deleteButton.innerHTML = "DeleteMode:" + deleteMode
}

function dist(x1, y1, x2, y2) {
    return ((x2 - x1) ** 2) + ((y2 - y1) ** 2)

}

