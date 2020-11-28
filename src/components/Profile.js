import { useSession } from './hooks/useSession';

const Profile = () => {
  const { user } = useSession();
  return (
    <div className='container'>
      {user && (
        <>
          <header className='jumbotron'>
            <h3>
              <strong>{user.username}</strong> Profile
            </h3>
          </header>

          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {user.roles &&
              user.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
          <ul>
            {user.Notifications &&
              user.Notifications.map((role, index) => (
                <li key={index}>{role.message}</li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export { Profile };
