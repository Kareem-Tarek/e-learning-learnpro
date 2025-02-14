document.addEventListener("DOMContentLoaded", function () {
    // Calendar Placeholder
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = generateCalendar(new Date());

    // Animate the circular progress bar
    const progressCircle = document.querySelector('.circle-progress circle:nth-child(2)');
    const percentage = 75;
    const circumference = 251.2;
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out';
    progressCircle.style.strokeDashoffset = offset;
});

// Function to generate a simple calendar UI
function generateCalendar(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    
    return `
        <h6>${monthNames[currentMonth]} ${currentYear}</h6>
        <table class="table table-sm table-borderless compact-table">
            <thead>
                <tr>${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => `<th>${d}</th>`).join('')}</tr>
            </thead>
            <tbody>${generateCalendarDays(currentYear, currentMonth)}</tbody>
        </table>
    `;
}

function generateCalendarDays(year, month) {
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let today = new Date(); // Get current date
    let isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    let currentDay = today.getDate(); // Get today's date number
    let calendarHtml = "<tr>";

    for (let i = 0; i < firstDay; i++) {
        calendarHtml += "<td></td>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0) {
            calendarHtml += "</tr><tr>";
        }

        // Highlight today's date
        let highlightClass = isCurrentMonth && day === currentDay ? 'class="today"' : '';

        calendarHtml += `<td ${highlightClass}>${day}</td>`;
    }

    calendarHtml += "</tr>";
    return calendarHtml;
}
