import { FORM_OPTIONS } from "../constants/formOptions"
import { STATUS } from "../constants/status"


const Filter = ({
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter
}) => {
    return (
        <div className="filter">
            <div>
                <p>Priority order:</p>
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    {Object.keys(FORM_OPTIONS.PRIORITY).map(key => (
                        <option key={key} value={FORM_OPTIONS.PRIORITY[key]}>
                            {FORM_OPTIONS.PRIORITY[key]}
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
                <p>Status:</p>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    {Object.keys(STATUS).map(key => (
                        <option key={key} value={STATUS[key]}>
                            {STATUS[key]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <p>Category order:</p>
                <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    {Object.keys(FORM_OPTIONS.CATEGORY).map(key => (
                        <option key={key} value={FORM_OPTIONS.CATEGORY[key]}>
                            {FORM_OPTIONS.CATEGORY[key]}
                        </option>
                    ))}
                    <option value={FORM_OPTIONS.CATEGORY.STUDY}>{FORM_OPTIONS.CATEGORY.STUDY}</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
