$(function(){
	
    // on click on button "Start" 
    
    $('#start').click(function() {
       
        // odbrojuvanje na pocetok na trkata e na klik na kopceto start, i e so zatemnuvanje na trakata za trka
        $(".bg-racing-track").animate({
            opacity: "0.5" 
        }, 100).delay(3000).animate({
            opacity: "1"
        }, 100);

        // posle startot na igrata, dvete kopcinja se desabled dodeka ne zavrsi

        $('#start').attr("disabled", "disabled");
        $('#reset').attr("disabled", "disabled");

        // odbrojuvanjeto pred startot
        // let count = 3;
        // $('.counter').show();
        // $(".counter").text(count);

        // OVA FUNKCIONIRA ODLICHNO !!! 
        // function countDown() {
        //     if (count > 1) {
        //         count --; 
        //         setTimeout(countDown, 1000);
        //         $(".counter").text(count);
        //     } else {
        //         $(".counter").text('');
        //     }
        // }
        // setTimeout(countDown, 1000);

        // setInterval pravi problem so kratenje na intervalot koga odnovo se igra a setTimeout ne pravi problem. Resenietoto e so setTimeout !!!
        // Vaka ne, pogresno e, koga ke vleze vo else ne se cisti intervalot i odborjuva celo vreme! 
        // setInterval(function() {
        //     if (count > 1) {
        //         count --; 
        //         $(".counter").text(count);
        //     } else {
        //         clearInterval();
        //         $(".counter").text('');
        //         console.log('nesto tuka');
        //     }
        // }, 1000);


        // Ova raboti : 
        let count = 3;
        $('.counter').show();
        $(".counter").text(count);

        function counting() {
            if (count > 1 ) {
                count --; 
                $(".counter").text(count);
            } else {
                $(".counter").text('');
                console.log('nesto tuka'); // test
                clearInterval(timer);
            }
        };

        let timer = setInterval(function(){
            counting();
            if (count < 1) {
                clearInterval(timer);
            }
        }, 1000);
        

        // Moze i vaka (isto raboti, dobro e!)
        // function counting() {
        //     if (count > 1) {
        //         $('.counter').show();
        //         count --; 
        //         $(".counter").text(count);
        //     } else {
        //         // clearInterval(timer);
        //         $(".counter").text('');
        //         $('.counter').hide();
        //     }
        // };
        // let timer = setInterval(function() {
        //     counting();
        //     if (count < 1 ){
        //         clearInterval(timer);
        //     }
        // }, 1000);

        // dolzina na kolata  da se odzeme od shirinata na window za da se dobie dolzina na trakata do finish (za da ne izleze nadvor od view port kolata)
        let carWidth = $('#car1').width();
        let racingTrackWidth = $(window).width() - carWidth;
        // random vreminja za dvete koli od 1 so 5000 milisecundi
        let time1 = Math.ceil(Math.random() * 6000);
        let time2 = Math.ceil(Math.random() * 6000);

        let isFinished = false; // na pocetok trkata ja setirame da ne e zavrshena

        let place = 'first'; // setirame varijalbla za mesto da e 'first'

        // funkcija koja proveruva dali nekoja kola ja stignala celta 
        function checkFinished() {
            if (isFinished  == false) {
                isFinished = true;
                $('.flag').css('display', 'block');
                $(".bg-racing-track").css('opacity', "0.5");
            } else {
                place = 'second';
            }
        };

        // za kolata 1 animacija : 

        $('#car1').delay(3000).animate({
            left: racingTrackWidth 
        }, time1, function() {
            checkFinished();
            $('.col-left').append(`<div class="car-left">Finished in: <span class="white">${place}</span> place with a time of: <span class="white">${time1}</span> milliseconds</div>`);

            localStorage.setItem('firstCar', `<div class="storage stor-car1"><span class="white">Car1</span> finished in <span class="white">${place}</span>, with a time of <span class="white">${time1}</span> milliseconds!</div>`);
        });

        // za kolata 2 animacija : 

        $('#car2').delay(3000).animate({
            left: racingTrackWidth 
        }, time2, function() {
            checkFinished();
            $('.col-right').append(`<div class="car-right">Finished in: <span class="red">${place}</span> place with a time of: <span class="red">${time2}</span> milliseconds</div>`);

            localStorage.setItem('secondCar', `<div class="storage stor-car2"><span class="red">Car2</span> finished in <span class="red">${place}</span>, with a time of <span class="red">${time2}</span> milliseconds!</div>`);
            
            // ovde samo na kopceto 'restart' za da gi vrati kolite levo, a posle klik na restart, da moze da se klikne nov 'start' za nova igra
            $('#reset').removeAttr("disabled");
        });
    });

    // On click on button "Start over", da se resetira igrata, so toa sto kolite se vrakjaat na strtna pozicija, sosema levo

    $('#reset').click(function() {

        $('#start').removeAttr("disabled"); // start moze da se klikne samo posle restart i pozicioniranje na kolite levo
        $(".bg-racing-track").css('opacity', "1");
        $('.flag').css('display', 'none');
        $('#car1').css('left', '0');
        $('#car2').css('left', '0');
    });

    // On load na stranata (na refresh) treba da se pojavat rezumtatite od poslednata trka socuvani vo local storage i da se prikazat vo desniot del vo dva reda : 
    

    let locStoCar1 = localStorage.getItem('firstCar');
    let locStoCar2 = localStorage.getItem('secondCar');
    // ako postoi nesto vo Local storage, samo togas da go prikaze i naslovot (ako nema nisto, da ne se pojavuva naslovot)
    if (locStoCar1 || locStoCar2) {
        $('.results-prev').append(`<h3>Results from the previous time you played this game:</h3>`);
        $('.results-prev').append(locStoCar1);
        $('.results-prev').append(locStoCar2);
    };
    
    // if(localStorage.getItem('firstCar') || localStorage.getItem('secondCar')) {
    //     // $('h3 #res').removeClass('results-prev'); // ne raboti so klasava
    //     $('.results-prev').append(`<h3>Results from the previous time you played this game:</h3>`);
    // } else {
    //     // $('h3 #res').addClass('results-prev');  // ne raboti so klasava 
    // };
    
    // $('.results-prev').append(localStorage.getItem('firstCar'));
    // $('.results-prev').append(localStorage.getItem('secondCar'));
    // console.log(localStorage.getItem('firstCar')); // za test

    localStorage.clear(); // za da na vtor reload (refresh na stranata) na stranata se izbrisat rezultatite i se sto e vo desniot del (go staviv za da mozam da testiram, moze da se trgne)
});