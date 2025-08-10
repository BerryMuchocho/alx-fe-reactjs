import ProfilePage from "./components/ProfilePage";
import UserContext from "./UserContext";

function App() {
  const userData = {
    name: "Berry",
    age: 25,
    bio: "Learning frontend development"
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;



