const EmptyTableRow = ({ children, color, bg }) => {
  if (!color) color = "black";
  if (!bg) bg = "white";
  return (
    <tr>
      <th className={`h-[60px] text-sm text-[${color}] bg-[${bg}]`} colSpan="6">
        <div className="flex justify-center">{children}</div>
      </th>
    </tr>
  );
};

export default EmptyTableRow;
