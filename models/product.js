const fs = require('fs');
const path = require('path');
const __dir = require('../util/path');
const p = path.join(__dir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // Returns an empty Array
            cb([]);
        } else {
            // Returns an Array
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    // static means, you can call this method just from class, 
    // not instantiated object of the class
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};