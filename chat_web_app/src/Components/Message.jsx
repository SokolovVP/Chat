export const Message = ({ MessageInfo }) => {
  return (
    <div className="w-fit">
      <span className="text-sm text-slate-600">{MessageInfo.userName}</span>
      <div className="p-2 bg-gray-100 rounded-lg shadow-md">
        {console.log(MessageInfo)}
        {MessageInfo.message}
      </div>
    </div>
  );
};
