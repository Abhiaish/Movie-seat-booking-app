const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);
//console.log(typeof(ticketPrice))

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);

}

//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    let seatsIndex = [...selectedSeats].map( seat =>[...seats].indexOf(seat))
   // console.log(seatsIndex)

   localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex))

    const selectedSeatsCount=selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    //console.log(selectedSeats)
    //console.log(selectedSeatsCount)
    

}

//get data from localstorage and populate ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//movie select event

movieSelect.addEventListener('change',e=>{
    ticketPrice=parseInt(e.target.value);
    // console.log(e.target.selectedIndex,e.target.value)
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

container.addEventListener('click',e =>{
    if(
        e.target.classList.contains('seat')&&
        !e.target.classList.contains('occupied')
    ){
       // console.log(e.target);
       e.target.classList.toggle('selected')
    }

    updateSelectedCount();
})

//initial count and total set
updateSelectedCount();