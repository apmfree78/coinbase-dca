migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
