$(document).ready(function() {
    window.fetchUsers = fetchUsers;

    function fetchUsers(page = 1, perPage = 10) {
        $.get(`api/users?page=${page}&per_page=${perPage}`, function(users) {
            $('#user-table-body').html('');

            users.forEach(user => {
                $('#user-table-body').append(`
                    <tr>
                        <td>${user.full_name}</td>
                        <td><a href="mailto:${user.email}">${user.email}</a></td>
                        <td>${user.age}</td>
                    </tr>
                `);
            });

            updateUrl(page, perPage);

            $.get('api/users/count', function (totalUsers) {
                loadPagination(totalUsers);
            });

            updateActivePage(page);
        });
    }

    $('#per-page').on('change', function () {
        let perPage = $(this).val();
        fetchUsers(1, perPage);
    });

    let currentPage = getCurrentPage();
    let perPage = getPerPage();

    fetchUsers(currentPage, perPage);

    $('#user-form').submit(function(e) {
        e.preventDefault();

        let full_name  = $('#full_name').val();
        let email  = $('#email').val();
        let date_of_birth  = $('#date_of_birth').val();

        if (full_name && email && date_of_birth) {
            $.post('api/users', { full_name, email, date_of_birth}, function (user) {
                $('#user-table-body').append(`
                    <tr>
                        <td>${user.full_name}</td>
                        <td><a class="link" href="mailto:someone@example.com">${user.email}</a></td>
                        <td>${user.age}</td>
                    </tr>
                `);
                $('#full_name').val('');
                $('#email').val('');
                $('#date_of_birth').val('');
            });
        }
    });
});
