"use client";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Monitor, CheckCircle, Loader2, Save } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function SettingsPage() {
  const { settings, loading, error, updateSection } = useSettings();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSaveSection = async (section: string, data: any) => {
    setSaveLoading(true);
    setSaveMessage("");

    const result = await updateSection(section, data);

    if (result.success) {
      setSaveMessage(`${section} settings saved successfully!`);
      setTimeout(() => setSaveMessage(""), 3000);
    } else {
      setSaveMessage(`Error: ${result.error}`);
    }

    setSaveLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl">
            No settings found. Settings will be created automatically.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your preferences and configurations</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {saveMessage && (
          <div className={`px-4 py-3 rounded-xl ${saveMessage.includes('Error')
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
            {saveMessage}
          </div>
        )}

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSaveSection('notifications', {
                  ...settings.notifications,
                  email: e.target.checked
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Task Reminders</p>
                <p className="text-sm text-gray-600">Get reminders for upcoming tasks</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.taskReminders}
                onChange={(e) => handleSaveSection('notifications', {
                  ...settings.notifications,
                  taskReminders: e.target.checked
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Team Updates</p>
                <p className="text-sm text-gray-600">Notifications about team activities</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.teamUpdates}
                onChange={(e) => handleSaveSection('notifications', {
                  ...settings.notifications,
                  teamUpdates: e.target.checked
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Report Alerts</p>
                <p className="text-sm text-gray-600">Alerts for generated reports</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.reportAlerts}
                onChange={(e) => handleSaveSection('notifications', {
                  ...settings.notifications,
                  reportAlerts: e.target.checked
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Monitor className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default View</label>
              <select
                value={settings.dashboard.defaultView}
                onChange={(e) => handleSaveSection('dashboard', {
                  ...settings.dashboard,
                  defaultView: e.target.value
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="overview">Overview</option>
                <option value="tasks">Tasks</option>
                <option value="team">Team</option>
                <option value="reports">Reports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
              <select
                value={settings.dashboard.theme}
                onChange={(e) => handleSaveSection('dashboard', {
                  ...settings.dashboard,
                  theme: e.target.value
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Task Preferences</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Duration</label>
              <input
                type="text"
                value={settings.tasks.defaultDuration}
                onChange={(e) => handleSaveSection('tasks', {
                  ...settings.tasks,
                  defaultDuration: e.target.value
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="30 mins"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Priority</label>
              <select
                value={settings.tasks.defaultPriority}
                onChange={(e) => handleSaveSection('tasks', {
                  ...settings.tasks,
                  defaultPriority: e.target.value
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reminder (minutes before)</label>
              <input
                type="number"
                value={settings.tasks.reminderMinutes}
                onChange={(e) => handleSaveSection('tasks', {
                  ...settings.tasks,
                  reminderMinutes: parseInt(e.target.value)
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {saveLoading && (
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Saving...</span>
          </div>
        )}
      </div>
    </div>
  );
}