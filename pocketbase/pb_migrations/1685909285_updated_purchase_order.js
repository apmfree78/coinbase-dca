migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvv7blwc",
    "name": "amount_purchased",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  // remove
  collection.schema.removeField("zvv7blwc")

  return dao.saveCollection(collection)
})
