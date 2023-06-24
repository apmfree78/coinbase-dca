migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mamfqhaq",
    "name": "limit_price",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mamfqhaq",
    "name": "limit_price",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
