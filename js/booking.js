(function ($){
    'use strict';

    function initBooking(){
        const bookingForm=$("#booking-form");
        const dimensionSelect=$("#dimension");
        const passengerCount=$("#passenger-count");
        const priceDisplay=$("#price-display");
        const riskAlert=$("#risk-alert");

        function calculatePriceAndRisk(){
            if (dimensionSelect.val().length===0 || passengerCount.val().length===0)
            {
                return;
            }

            const selectedOption = dimensionSelect.find("option:selected");
            const basePrice = parseInt(selectedOption.data('price') || 0);
            const riskLevel = selectedOption.data('risk') || 'Low';
            const passengers = parseInt(passengerCount.val() || 1);

            //fiyat güncelleme
            const total = basePrice * passengers;

            if (total>0){
                priceDisplay.text("$" + total.toLocaleString());
            }
            else{
                priceDisplay.text("$ 0 (fiyat bilgisi sorunlu)");
            }

            //risk uyarısı
            if(riskLevel === "High"){   
                riskAlert.removeClass("d-none");
                riskAlert.html(`
                    <strong>
                        DİKKAT!
                    </strong>
                    Seçtiğiniz boyut (TEHLİKELİ SINIF) yüksek radrasyon ve zaman anomalleri içerir. Özel sağlık sigortası zorunludur!  
                `);
            }
            else{
                riskAlert.addClass("d-none");
            }
        }

        dimensionSelect.on('change',calculatePriceAndRisk);
        passengerCount.on('change',calculatePriceAndRisk);

        bookingForm.on('submit', function(event){
            event.preventDefault();
            $(this).addClass("was-validated");

            if(this.checkValidity()){
                alert("Rezervasyon talebiniz merkeze iletildi. İyi yolculuklar.");
                this.reset();
                $(this).removeClass("was-validated");
                priceDisplay.text("$ 0");
                riskAlert.addClass(d-none);
            }
        });

    }

    $(function(){
        initBooking();
    });

})(jQuery);