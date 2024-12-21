const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <span
        className="loading loading-dots"
        style={{ transform: "scale(2.5)" }} // Increase size manually
      ></span>
    </div>
  );
};

export default Loading;
