migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubbwgdfy",
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
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2")

  // remove
  collection.schema.removeField("ubbwgdfy")

  return dao.saveCollection(collection)
})
