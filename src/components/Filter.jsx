const Filter = ({priorityFilter, setPriorityFilter, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter}) => {

  return (
    <div className="filter">
        <h2>Filter:</h2>

    <div className="filter-options">
        <div className="filter-priorityOrder">
            <p>Priority order:</p>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
    </div>

         <div className="filter-status">
            <p>Status:</p>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
            </select>
    </div>
    
        <div className="filter-categoryOrder">
            <p>Category order:</p>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
            </select>
        </div>

    </div>
    
</div>
)
}

export default Filter
