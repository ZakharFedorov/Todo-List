// Funkce, která generuje to-do data pro konkrétního uživatele a vypíše je ve formátu json
function loadJsonItems(){
    let itemu = [];
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("todo-items").onSnapshot((snapshot) => {
                let items = [];
                snapshot.docs.forEach((doc) => {
                    items.push({
                        id: doc.id,
                        uid: doc.uid,
                        description: doc.description, 
                        ...doc.data()
                    })
                })
                items.forEach((item) => {
                    if(user.uid == item.uid){
                        itemu.push(item)
                    }
                })
                document.getElementById("json").innerHTML = JSON.stringify(itemu, null, 4);
                return items
            })
        } else {
            LogOut()
        }
    });
}

function LogOut() {
    window.location.replace("/");
}

loadJsonItems()

module.exports = {loadJsonItems};