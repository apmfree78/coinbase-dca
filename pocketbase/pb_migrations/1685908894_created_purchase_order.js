migrate((db) => {
  const collection = new Collection({
    "id": "uua9ux4bce1etl0",
    "created": "2023-06-04 20:01:34.109Z",
    "updated": "2023-06-04 20:01:34.109Z",
    "name": "purchase_order",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "v2vohzn8",
        "name": "exchange",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "binance",
            "coinbase",
            "kraken",
            "bitstamp",
            "gemini"
          ]
        }
      },
      {
        "system": false,
        "id": "69hxc3gm",
        "name": "asset",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "BTC",
            "ETH",
            "ADA",
            "SOL",
            "MATIC"
          ]
        }
      },
      {
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
  const collection = dao.findCollectionByNameOrId("uua9ux4bce1etl0");

  return dao.deleteCollection(collection);
})
