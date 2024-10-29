import React, { useEffect, useState } from 'react';
import "./App.css";

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Инициализация VK SDK
    window.VK.init({
      apiId: process.env.REACT_APP_CLIENT_ID
    });
  }, []);

  const handleLogin = () => {
    window.VK.Auth.login((response: any) => {
      if (response.session) {
        // Пользователь авторизован
        console.log(response.session);
        setUserData(response.session.user);
      } else {
        // Ошибка авторизации
        console.error('Ошибка авторизации');
      }
    }, 2);  // '2' — это права доступа (scope), в данном случае - просто базовая информация о пользователе
  };

  return (
    <div className="App">
      <h2>VK ID Авторизация</h2>
      {userData ? (
        <div>
          <p>Привет, {userData.first_name} {userData.last_name}!</p>
          <img src={userData.photo_100} alt="Аватар" />
        </div>
      ) : (
        <button onClick={handleLogin}>Войти через ВКонтакте</button>
      )}
    </div>
  );
}

export default App;
