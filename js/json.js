function loadJsonItems(){
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
        document.getElementById("json").innerHTML = JSON.stringify(items);
        return items
    })
}
loadJsonItems()

module.exports = {loadJsonItems};