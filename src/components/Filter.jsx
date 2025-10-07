import { FORM_OPTIONS } from "../constants/FormOptions"
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
                    <option value={FORM_OPTIONS.PRIORITY.ALL}>{FORM_OPTIONS.PRIORITY.ALL}</option>
                    <option value={FORM_OPTIONS.PRIORITY.URGENT}>{FORM_OPTIONS.PRIORITY.URGENT}</option>
                    <option value={FORM_OPTIONS.PRIORITY.HIGH}>{FORM_OPTIONS.PRIORITY.HIGH}</option>
                    <option value={FORM_OPTIONS.PRIORITY.MEDIUM}>{FORM_OPTIONS.PRIORITY.MEDIUM}</option>
                    <option value={FORM_OPTIONS.PRIORITY.LOW}>{FORM_OPTIONS.PRIORITY.LOW}</option>
                </select>
            </div>

            <div>
                <p>Status:</p>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value={STATUS.ALL}>{STATUS.ALL}</option>
                    <option value={STATUS.COMPLETE}>{STATUS.COMPLETE}</option>
                    <option value={STATUS.INCOMPLETE}>{STATUS.INCOMPLETE}</option>
                </select>
            </div>

            <div>
                <p>Category order:</p>
                <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value={FORM_OPTIONS.CATEGORY.ALL}>{FORM_OPTIONS.CATEGORY.ALL}</option>
                    <option value={FORM_OPTIONS.CATEGORY.WORK}>{FORM_OPTIONS.CATEGORY.WORK}</option>
                    <option value={FORM_OPTIONS.CATEGORY.PERSONAL}>{FORM_OPTIONS.CATEGORY.PERSONAL}</option>
                    <option value={FORM_OPTIONS.CATEGORY.STUDY}>{FORM_OPTIONS.CATEGORY.STUDY}</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
