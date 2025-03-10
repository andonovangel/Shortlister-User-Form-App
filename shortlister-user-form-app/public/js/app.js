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
        });

        updateUrl(page, perPage);

        $.get('api/users/count', function(totalUsers) {
            loadPagination(totalUsers);
        });

        updateActivePage(page);
    }

    let currentPage = getCurrentPage();
    let perPage = getPerPage();

    fetchUsers(currentPage, perPage);

    $('#per-page').on('change', function() {
        let perPage = $(this).val();
        fetchUsers(1, perPage);
    });

    $('#user-form').submit(function(e) {
        e.preventDefault();

        let full_name  = $('#full_name').val();
        let email  = $('#email').val();
        let phone  = $('#phone').val();
        let date_of_birth  = $('#date_of_birth').val();

        if (full_name && email && date_of_birth) {
            $.post('api/users', { full_name, email, phone, date_of_birth}, function() {
                $('#full_name').val('');
                $('#email').val('');
                $('#phone').val('');
                $('#date_of_birth').val('');

                $('.error-message').hide();

                fetchUsers(currentPage, perPage);
            })
            .fail(function(error) {
                $('.error-message').hide();

                let errors = error.responseJSON.errors;
                for (let field in errors) {
                    $('#' + field + '-error').show();
                }
            });
        } else {
            if (!full_name) {
                $('#name-required-error').show();
            }
            if (!email) {
                $('#email-required-error').show();
            }
            if (!date_of_birth) {
                $('#date-required-error').show();
            }
        }
    });
});
