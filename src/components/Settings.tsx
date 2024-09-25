import React, { useState } from "react";

const Settings: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission to update the settings
    console.log({
      password,
      confirmPassword,
      notificationsEnabled,
      theme,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <form
        onSubmit={handleSaveSettings}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Password Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your new password"
            />
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>

        {/* Theme Preferences Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Theme Preferences</h2>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              Light
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              Dark
            </label>
          </div>
        </div>

        {/* Save Settings Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
