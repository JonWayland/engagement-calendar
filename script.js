document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const titleElement = document.getElementById('calendar-title');
    const daysOfWeekContainer = document.getElementById('days-of-week');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    daysOfWeekFull.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.textContent = day;
        daysOfWeekContainer.appendChild(dayLabel);
    });

    let currentDate = new Date(2024, 3); // Set for April 2024

    const events = [
        {"Date": "2024-04-01", "Event Title": "Team Meeting", "Detailed Description": "Monthly team meeting to discuss project updates."},
        {"Date": "2024-04-15", "Event Title": "Workshop", "Detailed Description": "A workshop on effective communication."},
        // More events can be added here
    ];

    function generateCalendar(d) {
        calendar.innerHTML = '';
        const month = d.getMonth();
        const year = d.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        titleElement.textContent = `Engagement Calendar for ${monthNames[month]}, ${year}`;

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day';
            calendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const dayElement = document.createElement('div');
          dayElement.className = 'calendar-day';
          const date = new Date(year, month, day);
          const dateString = date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
          const event = events.find(e => e.Date === dateString);
          const dayOfWeekAbbrev = daysOfWeek[date.getDay()].toLowerCase();
      
          dayElement.innerHTML = `<span class="day-number">${day}</span> <span class="day-abbrev">${dayOfWeekAbbrev}</span>`;
          
          if (event) {
              const eventElement = document.createElement('div');
              eventElement.className = 'event';
              eventElement.textContent = event['Event Title'];
              eventElement.onclick = function() {
                  alert(event['Detailed Description']); // Using alert for demonstration, consider a modal for better UX
              };
              dayElement.appendChild(eventElement);
          }
      
          calendar.appendChild(dayElement);
      }
    }

    generateCalendar(currentDate);

    window.showEventDetails = function(description) {
        alert(description);
    };
});
