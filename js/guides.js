(function ($) {
    'use strict';
    function loadGuides() {
        const guidesContainer = $("#guides-container");
        $.ajax({
            url: "data/guides.json",
            method: "GET",
            dataType: "json"
        }).done(function (data) {
            guidesContainer.empty();
            data.forEach(function (guide) {
                const badgeClass =
                    guide.status === 'Müsait' ? 'text-bg-success'
                        : guide.status === 'Görevde' ? 'text-bg-warning'
                            : 'text-bg-danger';
                const disabledAttr = guide.status !== 'Müsait' ? 'Disabled' : '';
                const cardHTML = `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card">
                            <img src="${guide.image}" alt="" class="card-img-top guide-image">
                            <div class="card-body text-center">
                                <h5 class="card-title">${guide.name}</h5>
                                <p class="card-text text-muted">${guide.specialty}</p>
                                <p>Deneyim: <strong>${guide.experience}</strong></p>
                                <span class="badge ${badgeClass}">${guide.status}</span>
                            </div>
                            <div class="card-footer border-0 bg-transparent text-center">
                                <button class="btn btn-primary btn-sm w-100 "${disabledAttr}>Rehber Seç</button>
                            </div>
                        </div>
                    </div>
                `;
                guidesContainer.append(cardHTML);
            })
        }).fail(function(error) {
            console.error('HATA: ',error)
            guidesContainer.html(`
                <div class="col-12">
                    <div class='alert alert-danger'>    
                        Veri çekilemedi. Bağlantınızı kontrol ediniz.
                    </div>
                </div>
            `)
        });
    }

    $(function () {
        loadGuides();
    });
})(jQuery);
