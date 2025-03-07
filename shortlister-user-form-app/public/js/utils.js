function updateUrl(page, perPage) {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', perPage);
    window.history.pushState({}, '', url);
}

function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') ? parseInt(params.get('page')) : 1;
}

function getPerPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('per_page') ? parseInt(params.get('per_page')) : 10;
}

function updateActivePage(page) {
    $('.page-number').removeClass('active');
    $(`.page-number[data-page="${page}"]`).addClass('active');
}
