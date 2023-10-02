import "../style/Date.css";

const currentDate = () => {
    const currentDate = new Date();
    const optionsMonthYear = { year: "numeric", month: "short" };
    const formattedMonthYear = currentDate.toLocaleDateString(undefined, optionsMonthYear);
    const optionsDay = { day: "numeric" };
    const formattedDay = currentDate.toLocaleDateString(undefined, optionsDay);
    const daySuffix = getDaySuffix(currentDate.getDate());

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
        }
    }

    return (
        <div className="current-date">
            <div className="calendar">
                <div className="calendar-header">
                    <span className="calendar-month-year">{formattedMonthYear}</span>
                </div>
                <div className="calendar-body">
                    <span className="calendar-date">{formattedDay}</span>
                    <span className="calendar-day-suffix"><sup>{daySuffix}</sup></span>
                </div>
            </div>
        </div>
    );
};


export default currentDate;