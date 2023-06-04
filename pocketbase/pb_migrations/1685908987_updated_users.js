migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jx4qqcxw",
    "name": "dca_orders",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "uua9ux4bce1etl0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "083a6uu6",
    "name": "exchange_auth_tokens",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("jx4qqcxw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "083a6uu6",
    "name": "exchange_tokens",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
