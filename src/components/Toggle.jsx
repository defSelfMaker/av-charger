let Toggle = ({ handleTheme }) => {
  return (
    <label className="switch">
      <input
        onChange={(e) => {
          handleTheme(e.target.checked);
        }}
        type="checkbox"
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Toggle;
