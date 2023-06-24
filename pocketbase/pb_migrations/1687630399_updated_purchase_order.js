migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "heqwrbg3",
    "name": "amount",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 10,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "heqwrbg3",
    "name": "amount",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 50,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
