import { useSelector } from 'react-redux';

function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  // console.log(user.name, 'user aho');
  if (!user) return;
  return (
    <div className="hidden text-sm font-semibold md:block">👤 {user.name} </div>
  );
}

export default UserInfo;
