require('dotenv').config({path: 'test.env'});

const Chance = require('chance');
const chance = new Chance();
const _ = require('lodash');
const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {CategoryModel} = require('../src/db/categoryShema');
const categoryService = require('../src/services/categoryService');

chai.use(chaiHttp);
describe('Category Tests', () => {
    beforeEach('clear database', (done) => {
        CategoryModel.remove({}, (err) => {
            should.not.exist(err);
            done();
        });
    });

    it('it should GET an empty array category for clear database', (done) => {
        categoryService.findAll((err, doc) => {
            doc.should.be.a('array');
            doc.length.should.be.eql(0);
            done();
        });
    });

    it('it should create a category ', (done) => {
        const obj = {
                name: chance.word()
        };
        categoryService.addNewCategory(obj, (err, doc) => {
            doc.should.be.a('object');
            doc.should.have.property('name').eql(obj.name);
            done();
        });
    });

    describe('when several categories are created', () => {
        let categories;
        beforeEach('create several categories', (done) => {
            async.timesSeries(3, (n, cb) => {
                const obj = {
                    name: chance.word()
                };
                categoryService.addNewCategory(obj, (err, result) => {
                    should.not.exist(err);
                    cb(null, JSON.parse(JSON.stringify(result._doc)));
                });
            }, (err, categoriesDB) => {
                categories = categoriesDB;
                done();
            });
        });

        it('it should GET categories', (done) => {
            categoryService.findAll((err, doc) => {
                should.not.exist(err);
                doc.should.be.a('array');
                doc.should.be.lengthOf(categories.length);
                _.forEach(JSON.parse(JSON.stringify(doc)), (category) => {
                    categories.should.deep.include(category);
                });
                done();
            });
        });
    });
});
