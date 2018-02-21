function showAllCategory() {
    $.ajax({
        url: '/categories/all',
        type: 'GET',
        contentType: 'application/json',
        success: function (categories) {
            data.products = categories;
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

$('#Create').click((e) => {
    const form = document.forms['CreateProducts'];
    const name = form.elements['name'].value;
    (name) ? $('#nameValid').hide() : $('#nameValid').show();
    if (!name ) return;
    if (!id) {
        $.ajax({
            url: '/categories/add',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                product: {
                    name: name,
                }
            }),
            success: function (result) {
                showAllCategory();
            },
            error: function (error) {
                alert(error.responseText);
                $("#WindowCreateCategory").modal('hide');
            }
        })
    } else {
        $.ajax({
            url: '/categories/update',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                product: {
                    id: id,
                    name: name,
                }
            }),
            success: function (result) {
                showAllCategory();
                $("#WindowCreateCategory").modal('hide');
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
    deleteCategory(id);
});

function deleteCategory(id) {
    $.ajax({
        url: 'categories/delete/' + id,
        contentType: 'application/json',
        method: 'GET',
        success: function (result) {
            showAllCategory();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

$('body').on('click', '.updateLink', function () {
    id = this.id;
    $.ajax({
        url: '/categories/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (product) {
            const form = document.forms['CreateProducts'];
            form.elements['name'].value = product.name;
            $("#WindowCreateCategory").modal('show');
        },
        error: function (error) {
            return (error);
        }
    });
});

const data = {};
let id = '';
const template = Handlebars.compile($('#template').html());
showAllCategory();