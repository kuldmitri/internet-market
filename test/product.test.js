require('dotenv').config({path: 'test.env'});

const Chance = require('chance');
const chance = new Chance();
const _ = require('lodash');
const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {ProductModel} = require('../src/db/productShema');
const productService = require('../src/services/productService');
const ObjectID = require("mongodb").ObjectID;

chai.use(chaiHttp);
describe('Product Tests', () => {
    beforeEach('clear database', (done) => {
        ProductModel.remove({}, (err) => {
            should.not.exist(err);
            done();
        });
    });

    it('it should GET an empty array products for clear database', (done) => {
        productService.findAll((err, doc) => {
            doc.should.be.a('array');
            doc.length.should.be.eql(0);
            done();
        });
    });

    it('it should create a product ', (done) => {
        const obj = {
                title: chance.word(),
                price: chance.integer({min: 10, max: 200}),
                count: chance.integer({min: 10, max: 200}),
                categoryId: new ObjectID()
        };
        productService.addNewProduct(obj, (err, doc) => {
            doc.should.be.a('object');
            doc.should.have.property('title').eql(obj.title);
            doc.should.have.property('price').eql(obj.price);
            doc.should.have.property('count').eql(obj.count);
            doc.should.have.property('categoryId').eql(obj.categoryId);
            done();
        });
    });

    describe('when several products are created', () => {
        let products;
        beforeEach('create several products', (done) => {
            async.timesSeries(3, (n, cb) => {
                const obj = {
                        title: chance.word(),
                        price: chance.integer({min: 10, max: 200}),
                        count: chance.integer({min: 10, max: 200}),
                        categoryId:  new ObjectID()
                };
                productService.addNewProduct(obj, (err, result) => {
                    should.not.exist(err);
                    cb(null, JSON.parse(JSON.stringify(result._doc)));
                });
            }, (err, productsDB) => {
                products = productsDB;
                done();
            });
        });

        it('it should GET products', (done) => {
            productService.findAll((err, doc) => {
                should.not.exist(err);
                doc.should.be.a('array');
                doc.should.be.lengthOf(products.length);
                _.forEach(JSON.parse(JSON.stringify(doc)), (product) => {
                    products.should.deep.include(product);
                });
                done();
            });
        });
    });
});
