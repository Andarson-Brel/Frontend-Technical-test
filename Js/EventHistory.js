import { filterEvents } from './Filter.js';

document.addEventListener('DOMContentLoaded', () => {
  let itemsPerPage = 10;
  let currentPage = 1;
  let totalPages = 1;
  let eventData = [];
  let filteredData = [];
  let searchQuery = '';
  let statusFilter = '';
  let nameFilter = '';

  const modal = document.getElementById('eventModal');
  const closeModalBtn = document.querySelector('.close-btn');
  const modalEventName = document.getElementById('modalEventName');
  const modalEventDate = document.getElementById('modalEventDate');
  const modalEventDescription = document.getElementById('modalEventDescription');
  const modalSpeakers = document.getElementById('modalSpeakers');
  const modalAttendees = document.getElementById('modalAttendees');

  fetchData();

  async function fetchData() {
    try {
      const response = await fetch('./sample_events.json');

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      eventData = await response.json();
      filteredData = [...eventData];
      totalPages = Math.ceil(filteredData.length / itemsPerPage);
      updateDisplayCount();
      renderEventHistory();
      renderPagination();
      setDefaultItemsPerPage();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  function updateDisplayCount() {
    const displayCount = document.querySelector('.display-count');
    displayCount.textContent = `Displaying ${filteredData.length} results`;
  }

  function setDefaultItemsPerPage() {
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    itemsPerPageSelect.value = itemsPerPage;
  }

  document.getElementById('search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    applyFilters();
  });

  document.getElementById('status-filter').addEventListener('change', (e) => {
    statusFilter = e.target.value.toLowerCase();
    applyFilters();
  });

  document.getElementById('name-filter').addEventListener('change', (e) => {
    nameFilter = e.target.value.toLowerCase();
    applyFilters();
  });

  document.getElementById('itemsPerPage').addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    renderEventHistory();
    renderPagination();
  });

  function applyFilters() {
    filteredData = filterEvents(eventData, searchQuery, statusFilter, nameFilter);
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    updateDisplayCount();
    renderEventHistory();
    renderPagination();
  }

  function renderEventHistory() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const eventsToShow = filteredData.slice(startIndex, endIndex);

    eventsToShow.forEach((event, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="${isDarkMode ? 'dark-mode' : ''}">${event.event_name}</td>
        <td class="${isDarkMode ? 'dark-mode' : ''}">${event.date}</td>
        <td class="${isDarkMode ? 'dark-mode' : ''}">${event.speakers[0].name}</td>
        <td class="${isDarkMode ? 'dark-mode' : ''}">
          <span class="status ${event.status.toLowerCase().replace(/\s+/g, '')} ${isDarkMode ? 'dark-mode' : ''}">
            <div class="progress-dot"></div>${event.status}
          </span>
        </td>
      `;

      row.addEventListener('click', () => openModal(event)); // Attach click event to open the modal
      tableBody.appendChild(row);
    });
  }

  function openModal(eventData) {
    console.log(eventData)
    // Set the content of the modal with event data
    modalEventName.textContent = eventData.event_name;
    modalEventDate.textContent = eventData.date;
    modalEventDescription.textContent = eventData.description;
    modalSpeakers.innerHTML = '';  // Clear previous speaker data

   // Clear previous speaker data in the modalSpeakers container
modalSpeakers.innerHTML = '';

// Loop through each speaker and append the image and name directly to the modalSpeakers container
eventData.speakers.forEach(speaker => {
  // Create the speaker image
  const speakerImg = document.createElement('img');
  speakerImg.src = speaker.img;
  speakerImg.alt = speaker.name;
  speakerImg.style.width = '30px';
  speakerImg.style.height = '30px';
  speakerImg.style.borderRadius = '50%';
  speakerImg.style.marginRight = '10px';  // Add some space between image and name

  // Create the speaker name
  const speakerName = document.createElement('span');
  speakerName.textContent = `${eventData.speakers.length} Speakers:`;

  // Append image and name directly to the modalSpeakers container
  modalSpeakers.appendChild(speakerImg);
  modalSpeakers.appendChild(speakerName);
});


    modalAttendees.textContent = eventData.attendees +" "+ "Attendees";

    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
      modal.classList.add('dark-mode');
    } else {
      modal.classList.remove('dark-mode');
    }

    modal.style.display = 'block';  // Show the modal
  }

  // Close modal when close button is clicked
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal if clicked outside the content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('prev-btn');
    if (isDarkMode) {
      prevButton.classList.add('dark-mode');
    }
    prevButton.disabled = currentPage === 1;

    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderEventHistory();
        renderPagination();
      }
    });

    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('page-btn');
      if (i === currentPage) pageButton.classList.add('active');
      if (isDarkMode) {
        pageButton.classList.add('dark-mode');
      }

      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderEventHistory();
        renderPagination();
      });

      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('next-btn');
    if (isDarkMode) {
      nextButton.classList.add('dark-mode');
    }
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderEventHistory();
        renderPagination();
      }
    });

    paginationContainer.appendChild(nextButton);
  }
});
