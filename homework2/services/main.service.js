module.exports = {
    deleteItem: (db, _id) => db.findByIdAndDelete(_id),

    findItem: (db, item) => db.find(item),

    setItem: (db, item) => db.create(item),

    updateItem: (db, _id, data) => db.findByIdAndUpdate(_id, data)
};
