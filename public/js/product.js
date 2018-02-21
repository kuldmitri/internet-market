function showAllProduct() {
    $.ajax({
        url: '/products/all',
        type: 'GET',
        contentType: 'application/json',
        success: function (products) {
            data.products = products;
            $('#search').html(template(data));
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
    $.ajax({
        url: '/categories/all',
        type: 'GET',
        contentType: 'application/json',
        success: function (categories) {
            console.log(categories);
            data.categories = categories;
            $('#ulCategories').html(templateCategory(data));
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
};

function showCategoryProduct(id) {
    $.ajax({
        url: '/products/findCategory/'+id,
        type: 'GET',
        contentType: 'application/json',
        success: function (products) {
            data.products = products;
            console.log(products);
            $('#search').html(template(data));
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
};

$('#button1').click((e) => {
    alert('button1');
});

function loadCategoryToSelect() {
    $.ajax({
        url: '/categories/all',
        type: 'GET',
        contentType: 'application/json',
        success: function (categories) {
            let x = document.getElementById("selectCategory");
            let length = x.options.length;
            for (let i = 0; i < length;) {
                x.options[i] = null;
                length = x.options.length;
            }
            let option;
            for (let i = 0; i < categories.length; i++) {
                option = document.createElement("option");
                option.text = categories[i].name;
                option.value = categories[i]._id;
                x.add(option);
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

$('#AddNew').click((e) => {
    loadCategoryToSelect();
    $("#WindowCreateProducts").modal('show');
});

$('#Create').click((e) => {
    const form = document.forms['CreateProducts'];
    const title = form.elements['title'].value;
    const price = form.elements['price'].value;
    const count = form.elements['count'].value;
    const sel = document.getElementById("selectCategory");
    const category = sel.options[sel.selectedIndex].value;
    (title) ? $('#titleValid').hide() : $('#titleValid').show();
    (price) ? $('#priceValid').hide() : $('#priceValid').show();
    (count) ? $('#countValid').hide() : $('#countValid').show();
    if (!title || !price || !count) return;
    if (!id) {
        $.ajax({
            url: '/products/add',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                product: {
                    title: title,
                    price: price,
                    count: count,
                    categoryId: category
                }
            }),
            success: function (result) {
                showAllProduct();
            },
            error: function (error) {
                alert(error.responseText);
                $("#WindowCreateProducts").modal('hide');
            }
        })
    } else {
        $.ajax({
            url: '/products/update',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                product: {
                    id: id,
                    title: title,
                    price: price,
                    count: count,
                    categoryId: category
                }
            }),
            success: function (result) {
                showAllProduct();
                $("#WindowCreateProducts").modal('hide');
                id = '';
            },
            error: function (error) {
                alert(error.responseText);
                id = '';
            }
        })
    }
});

$('body').on('click', '.deleteLink', function () {
    id = this.id;
    deleteProduct(id);
});

$('body').on('click', '.liCategory', function () {
    categoryId = this.id;
    showCategoryProduct(categoryId);
});

function deleteProduct(id) {
    $.ajax({
        url: 'products/delete/' + id,
        contentType: 'application/json',
        method: 'GET',
        success: function (result) {
            showAllProduct();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

$('body').on('click', '.updateLink', function () {
    id = this.id;
    $.ajax({
        url: '/products/find/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (product) {
            const form = document.forms['CreateProducts'];
            form.elements['title'].value = product.title;
            form.elements['price'].value = product.price;
            form.elements['count'].value = product.count;
            loadCategoryToSelect();
            $("#WindowCreateProducts").modal('show');
        },
        error: function (error) {
            return (error);
        }
    });
});

const data = {};
let id = '';
let categoryId = '';
const template = Handlebars.compile($('#template').html());
const templateCategory = Handlebars.compile($('#templateCategory').html());

showAllProduct();