function loadPagination(totalUsers) {
    $('#pagination').html('');

    let perPage = getPerPage();
    let totalPages = Math.ceil(totalUsers / perPage);
    let currentPage = getCurrentPage();

    let prevBtn = `
        <button id="prev-page" data-totalPages="${totalPages}">Previous</button>
    `;

    let nextBtn = `
        <button id="next-page" data-totalPages="${totalPages}">Next</button>
    `;

    if (totalPages > 1) {
        if (currentPage != 1) {
            $('#pagination').append(prevBtn);
        }

        for (let i = 1; i <= totalPages; i++) {
            $('#pagination').append(`
                <button class="page-number ${ i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
            `);
        }

        if (currentPage != totalPages) {
            $('#pagination').append(nextBtn);
        }
    } else if (totalPages === 1) {
        $('#pagination').append(`
            <button class="page-number active">1</button>
        `);
    }
}

$(document).on('click', '.page-number', function (e) {
    let page = $(this).data('page');
    fetchUsers(page, getPerPage());
});

$(document).on('click', '#prev-page', function (e) {
    let currentPage = getCurrentPage();
    if (currentPage > 1) {
        fetchUsers(currentPage - 1, getPerPage());
    }
});

$(document).on('click', '#next-page', function (e) {
    let currentPage = getCurrentPage();
    $.get('api/users/count', function (totalUsers) {
        let totalPages = Math.ceil(totalUsers / getPerPage());
        if (currentPage < totalPages) {
            fetchUsers(currentPage + 1, getPerPage());
        }
    });
});
