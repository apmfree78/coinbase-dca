migrate((db) => {
  const collection = new Collection({
    "id": "cue25fs3ldv8fl2",
    "created": "2023-06-23 00:07:36.023Z",
    "updated": "2023-06-23 00:07:36.023Z",
    "name": "submitted_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9v2bpdio",
        "name": "order_id",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mcoml0pm",
        "name": "product_id",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "wjlir6yf",
        "name": "owner",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "1cdzw8vc",
        "name": "isFilled",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cue25fs3ldv8fl2");

  return dao.deleteCollection(collection);
})
