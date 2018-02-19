$('#All').click((e) => {
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
});

$('#Create').click((e) => {
    const form = document.forms['CreateProducts'];
    const title = form.elements['title'].value;
    const price = form.elements['price'].value;
    const count = form.elements['count'].value;
    (title) ? $('#titleValid').hide() : $('#titleValid').show();
    (price) ? $('#priceValid').hide() : $('#priceValid').show();
    (count) ? $('#countValid').hide() : $('#countValid').show();
    if (!title || !price || !count) return;
    $.ajax({
        url: '/products/add',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
            product: {
                title: title,
                price: price,
                count: count
            }
        }),
        success: function (result) {
            $('#All').triggerHandler('click');
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
});

$('body').on('click', '.deleteLink', function () {
    const id = this.id;
    deleteProduct(id);
});

function deleteProduct(id) {
    $.ajax({
        url: 'products/delete/' + id,
        contentType: 'application/json',
        method: 'GET',
        success: function (result) {
            $('#All').triggerHandler('click');
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

const data = {};
const template = Handlebars.compile($('#template').html());
$('#All').triggerHandler('click');