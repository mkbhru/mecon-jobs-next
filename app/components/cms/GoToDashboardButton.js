
const GoToDashboardButton = () => {
  const handleClick = () => {
    // Use window.location.href to navigate to the dashboard
    window.location.href = "/cms";
  };
  return (
    <>
      <button className="btn btn-primary font-bold " onClick={handleClick}>
        Dashboard
      </button>
      
    </>
  );
};

export default GoToDashboardButton;
