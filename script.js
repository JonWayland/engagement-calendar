document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const monthYearElement = document.getElementById('month-year');
    const btnPrevMonth = document.getElementById('prevMonth');
    const btnNextMonth = document.getElementById('nextMonth');
    const btnCurrentMonth = document.getElementById('currentMonth'); // Current Month button
    const daysOfWeekContainer = document.getElementById('days-of-week');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const events = [
        {"Date": "2024-04-01", "Event Title": "Client Call", "Detailed Description": "Call with client to review project details."},
        {"Date": "2024-04-01", "Event Title": "Birthday Party", "Detailed Description": "Buy the birthday cake and get the party supplies."},
        {"Date": "2024-04-01", "Event Title": "April Fool's Day", "Detailed Description": "Make sure to play a prank on someone. Some ideas of pranks you could pull are setting a whoopee cushion on someone's chair, putting a toy snake on their desk, or simply scheduling a meeting over their lunch hour to make them believe they won't be able to eat lunch. Whatever prank you pull, please be sure to make it classy and respectful of whoever you are pulling it on. Always consider their feelings! You can also Google different ideas by visiting <a href='https://Google.com' target='_blank'>google.com</a>."},
        {"Date": "2024-04-01", "Event Title": "Exciting Survey", "Detailed Description": "Deadline to complete the most exciting survey."},
        {"Date": "2024-04-01", "Event Title": "Big Project is Due Today", "Detailed Description": "That big project you were working on is due today."},
        {"Date": "2024-04-01", "Event Title": "Team Meeting", "Detailed Description": "Monthly team meeting to discuss project updates."},
        {"Date": "2024-04-15", "Event Title": "Workshop", "Detailed Description": "A workshop on effective communication."},
        {"Date": "2024-05-15", "Event Title": "May Workshop", "Detailed Description": "May's Workshop Details are here."}
        // More events can be added here
    ];

    daysOfWeek.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.textContent = day;
        daysOfWeekContainer.appendChild(dayLabel);
    });

    let currentDate = new Date(); // Initializing the current date to be the starting point

    function generateCalendar(d) {
    calendar.innerHTML = '';
    const month = d.getMonth();
    const year = d.getFullYear();
    const today = new Date(); // Get today's date to use for comparison
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    monthYearElement.textContent = `${monthNames[month]}, ${year}`;

    // Fill empty cells for days of the week before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendar.appendChild(emptyCell);
    }

    // Fill the calendar with actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        const date = new Date(year, month, day);

        // Adding day number and day abbreviation
        dayElement.innerHTML = `<span class="day-number">${day}</span> <span class="day-abbrev">${daysOfWeek[date.getDay()].toLowerCase()}</span>`;

        // Highlight today's date if it matches
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            dayElement.classList.add('today-highlight'); // Use class to highlight the day
        }

        // Appending events to each day as applicable
        const dayEvents = events.filter(e => e.Date === date.toISOString().split('T')[0]);
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = event['Event Title'];
            eventElement.onclick = function() {
                showModal(event['Detailed Description']);
            };
            dayElement.appendChild(eventElement);
        });

        calendar.appendChild(dayElement);
      }
    }

    
    function showModal(description) {
        const modal = document.getElementById('myModal');
        const modalDescription = document.getElementById('modal-description');
        modalDescription.innerHTML = description;  // Changed to innerHTML
        modal.style.display = 'block';
    }

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('myModal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Event listeners for navigation buttons
    btnPrevMonth.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    btnNextMonth.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    btnCurrentMonth.addEventListener('click', function() {
        currentDate = new Date(2024, 3); // Reset to April 2024
        generateCalendar(currentDate);
    });

    generateCalendar(currentDate);
});
