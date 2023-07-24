const rows = 9;
const seatsPerRow = 10;
let selectedSeats = []

function generateSeats() {
    const cinemaSeats = document.getElementById("cinema-seats");

    for (let i = 1; i <= rows; i++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");

        for (let j = 1; j <= seatsPerRow + 1; j++) {

            if (j <= seatsPerRow) {
                const seatElement = document.createElement("div");
                seatElement.classList.add("seat");

                seatElement.addEventListener("click", () => {
                    selectSeat(i, j);
                });

                const isSelected = selectedSeats.some(seat => seat.row === i && seat.seat === j);
                if (isSelected) {
                    seatElement.classList.add("selected");
                }

                rowElement.appendChild(seatElement);
            }
            if (j == seatsPerRow + 1) {
                let num = 'Ряд ' + i.toString()
                let numberOfRow = document.createElement("p");
                numberOfRow.classList.add('number')
                numberOfRow.append(num)
                rowElement.appendChild(numberOfRow)
            }
        }

        cinemaSeats.appendChild(rowElement);
    }

    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let k = seatsPerRow; k >= 1; k--) {
        let num2 = k.toString()
        let numberOfSeat = document.createElement("div");
        numberOfSeat.classList.add("numberSeat");
        numberOfSeat.append(num2)
        rowElement.appendChild(numberOfSeat)
    }

    cinemaSeats.appendChild(rowElement);
}

function selectSeat(row, seat) {
    const seatElement = document.querySelector(`.row:nth-child(${row}) .seat:nth-child(${seat})`);

    if (seatElement.classList.contains("selected")) {
        seatElement.classList.remove("selected");
        const index = selectedSeats.findIndex(s => s.row === row && s.seat === seat);
        selectedSeats.splice(index, 1);
    } else {
        seatElement.classList.add("selected");
        selectedSeats.push({ row, seat });
    }

    localStorage.setItem('seats', JSON.stringify(selectedSeats))
    console.log(selectedSeats);
}
function goToPage(page) {
    window.location.href = page;
}

window.addEventListener('load', () => {
    selectedSeats = JSON.parse(localStorage.getItem('seats')) || [];
    generateSeats();
});
