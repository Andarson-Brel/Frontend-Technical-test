export function filterEvents(events, searchQuery, statusFilter, nameFilter) {
    return events.filter(event => {
      const matchesSearch = event.event_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? event.status.toLowerCase() === statusFilter.toLowerCase() : true;
      const matchesName = nameFilter ? event.speaker.toLowerCase().includes(nameFilter.toLowerCase()) : true;
  
      return matchesSearch && matchesStatus && matchesName;
    });
  }
  