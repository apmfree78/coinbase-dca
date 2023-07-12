migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  collection.createRule = "@request.auth.id = owner.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  collection.createRule = null

  return dao.saveCollection(collection)
})
