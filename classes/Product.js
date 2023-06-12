'use strict'
const safeid = require('generate-safe-id')

class Product {

    sku
    name
    price
    stock_count
    category
    tags
    description
    info
    assessment
    images

    constructor(name, price, stock_count, category, tags, description, info, assessment, images) {
        this.sku = safeid()
        this.name = name;
        this.price = price;
        this.stock_count = stock_count;
        this.category = category;
        this.tags = new Array();
        this.description = description;
        this.info = info;
        this.assessment = assessment;
        this.images = new Array();
    }

    setName(name) {
        this.name = name
    }

    setPrice(price){
        this.price = price
    }

    setStockCount(stockCount){
        this.stock_count = stockCount
    }

    setCategory(category){
        this.category = category
    }

    addTag(tag){
        this.tags.push(tag)
    }

    setDescription(description){
        this.description = description
    }

    setInfo(info){
        this.info = info
    }

    setAssessment(assessment){
        this.assessment = assessment
    }

    addImage(imageURL){
        this.images.push(imageURL)
    }






    getSKU() {
        return this.sku
    }

    getName() {
        return this.name
    }

    getPrice() {
        return this.price
    }

    getStockCount() {
        return this.stock_count
    }

    getCategory() {
        return this.category
    }

    getTags() {
        return this.tags
    }

    getDescription() {
        return this.description
    }

    getInfo() {
        return this.info
    }

    getAssessment() {
        return this.assessment
    }

    getImages() {
        return this.images
    }

}

module.exports = Product