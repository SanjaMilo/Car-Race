$(function(){
	
    // on click on button "Race!"  (starts the race)
    
    $('#start').click(function() {
       
        // Countdown by clicking on the start button and dim the racing track
        $(".bg-racing-track").animate({
            opacity: "0.5" 
        }, 100).delay(3000).animate({
            opacity: "1"
        }, 100);

        // After the start of the race, the two buttons are disabled until the finish of the race

        $('#start').attr("disabled", "disabled");
        $('#reset').attr("disabled", "disabled");
        

        // // This is an option also:
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

        let count = 3;
        $('.counter').show();
        $(".counter").text(count);

        function counting() {
            if (count > 1 ) {
                count --; 
                $(".counter").text(count);
            } else {
                $(".counter").text('');
                clearInterval(timer);
            }
        };

        let timer = setInterval(function(){
            counting();
            if (count < 1) {
                clearInterval(timer);
            }
        }, 1000);
        

        // // This is an option also:
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


        // Subtract the lenth of the car from the window width, in order to get the lenth of the track till finish (and avoid car exit from the view port)

        let carWidth = $('#car1').width();
        let racingTrackWidth = $(window).width() - carWidth;
        // random timing for the both cars, from 1 to 5000 milliseconds 
        let time1 = Math.ceil(Math.random() * 6000);
        let time2 = Math.ceil(Math.random() * 6000);

        let isFinished = false; // at the start we set the race to be not finished

        let place = 'first'; // setting variable for the 'first' place reaching car (winner)

        // Check if any car has reached the Finish line
        function checkFinished() {
            if (isFinished  == false) {
                isFinished = true;
                $('.flag').css('display', 'block');
                $(".bg-racing-track").css('opacity', "0.5");
            } else {
                place = 'second';
            }
        };

        // Animation for the car 1 : 

        $('#car1').delay(3000).animate({
            left: racingTrackWidth 
        }, time1, function() {
            checkFinished();
            $('.col-left').append(`<div class="car-left">Finished in: <span class="white">${place}</span> place with a time of: <span class="white">${time1}</span> milliseconds</div>`);

            localStorage.setItem('firstCar', `<div class="storage stor-car1"><span class="white">Car1</span> finished in <span class="white">${place}</span>, with a time of <span class="white">${time1}</span> milliseconds!</div>`);
        });

        // Animation for car 2 : 

        $('#car2').delay(3000).animate({
            left: racingTrackWidth 
        }, time2, function() {
            checkFinished();
            $('.col-right').append(`<div class="car-right">Finished in: <span class="red">${place}</span> place with a time of: <span class="red">${time2}</span> milliseconds</div>`);

            localStorage.setItem('secondCar', `<div class="storage stor-car2"><span class="red">Car2</span> finished in <span class="red">${place}</span>, with a time of <span class="red">${time2}</span> milliseconds!</div>`);
            
            // Remove disabled on the "Start over" to return the cars on the left side on the start position.
            $('#reset').removeAttr("disabled");
        });
    });

    // On click "start over", the race restarts, the cars are on left start position

    $('#reset').click(function() {

        $('#start').removeAttr("disabled"); // you can click on Race! only after resetting - repositioning the cars
        $(".bg-racing-track").css('opacity', "1");
        $('.flag').css('display', 'none');
        $('#car1').css('left', '0');
        $('#car2').css('left', '0');
    });

    // On page reload (refresh) the results from previous race show on the right-bottom side 

    let locStoCar1 = localStorage.getItem('firstCar');
    let locStoCar2 = localStorage.getItem('secondCar');
    
    // If there is data in local storage, only than show the title "Results from previous game..."

    if (locStoCar1 || locStoCar2) {
        $('.results-prev').append(`<h3>Results from the previous time you played this game:</h3>`);
        $('.results-prev').append(locStoCar1);
        $('.results-prev').append(locStoCar2);
    };

    localStorage.clear(); 
    // On the second page reload remove the results from previous race (this is just added for testing purposes, to remove clear local storage)
});