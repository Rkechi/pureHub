"use client";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Monitor, CheckCircle, Loader2, Save, Wifi, Eye, EyeOff, Plus, Trash2, Radio } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function SettingsPage() {
  const { settings, loading, error, updateSection } = useSettings();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [testingConnection, setTestingConnection] = useState<'thingspeak' | 'awsiot' | null>(null);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [showReadKey, setShowReadKey] = useState(false);
  const [showWriteKey, setShowWriteKey] = useState(false);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', type: 'VOC', location: '' });

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

  const handleTestConnection = async (type: 'thingspeak' | 'awsiot') => {
    if (!settings) return;

    const iotSettings = settings.iot || {
      thingspeak: { enabled: false, channelId: '', readApiKey: '', writeApiKey: '', description: '' },
      awsIot: { enabled: false, endpoint: '', region: 'us-east-1', description: '' },
      devices: []
    };

    setTestingConnection(type);
    setConnectionMessage("");

    try {
      const config = type === 'thingspeak'
        ? {
          channelId: iotSettings.thingspeak.channelId,
          readApiKey: iotSettings.thingspeak.readApiKey,
        }
        : {
          endpoint: iotSettings.awsIot.endpoint,
          region: iotSettings.awsIot.region,
        };

      const response = await fetch('/api/settings/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, config }),
      });

      const result = await response.json();

      if (result.success) {
        setConnectionMessage(`✅ ${result.message}`);
      } else {
        setConnectionMessage(`❌ ${result.message}`);
      }
    } catch (error: any) {
      setConnectionMessage(`❌ Connection test failed: ${error.message}`);
    } finally {
      setTestingConnection(null);
      setTimeout(() => setConnectionMessage(""), 5000);
    }
  };

  const handleAddDevice = async () => {
    if (!settings || !newDevice.name || !newDevice.location) return;

    const iotSettings = settings.iot || { thingspeak: { enabled: false, channelId: '', readApiKey: '', writeApiKey: '', description: '' }, awsIot: { enabled: false, endpoint: '', region: 'us-east-1', description: '' }, devices: [] };

    const device = {
      id: `device-${Date.now()}`,
      ...newDevice,
      status: 'inactive' as const,
      lastReading: new Date(),
    };

    const updatedDevices = [...iotSettings.devices, device];
    await handleSaveSection('iot', {
      ...iotSettings,
      devices: updatedDevices,
    });
    setShowDeviceForm(false);
    setNewDevice({ name: '', type: 'VOC', location: '' });
  };

  const handleRemoveDevice = async (deviceId: string) => {
    if (!settings) return;

    const iotSettings = settings.iot || { thingspeak: { enabled: false, channelId: '', readApiKey: '', writeApiKey: '', description: '' }, awsIot: { enabled: false, endpoint: '', region: 'us-east-1', description: '' }, devices: [] };

    const updatedDevices = iotSettings.devices.filter(d => d.id !== deviceId);
    await handleSaveSection('iot', {
      ...iotSettings,
      devices: updatedDevices,
    });
  };

  const handleUpdateIoTSection = async (subsection: 'thingspeak' | 'awsIot', data: any) => {
    if (!settings) return;

    const iotSettings = settings.iot || { thingspeak: { enabled: false, channelId: '', readApiKey: '', writeApiKey: '', description: '' }, awsIot: { enabled: false, endpoint: '', region: 'us-east-1', description: '' }, devices: [] };

    await handleSaveSection('iot', {
      ...iotSettings,
      [subsection]: data,
    });
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

  // Ensure IoT settings exist with defaults for backwards compatibility
  const iotSettings = settings.iot || {
    thingspeak: { enabled: false, channelId: '', readApiKey: '', writeApiKey: '', description: '' },
    awsIot: { enabled: false, endpoint: '', region: 'us-east-1', description: '' },
    devices: []
  };

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

        {/* IoT Device Integration */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Wifi className="w-6 h-6 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-900">IoT Device Integration</h2>
          </div>

          {connectionMessage && (
            <div className={`mb-4 px-4 py-3 rounded-xl ${connectionMessage.includes('✅')
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
              {connectionMessage}
            </div>
          )}

          {/* ThingSpeak Configuration */}
          <div className="mb-6 p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">ThingSpeak</h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-semibold text-gray-700">Enable</span>
                <input
                  type="checkbox"
                  checked={iotSettings.thingspeak.enabled}
                  onChange={(e) => handleUpdateIoTSection('thingspeak', {
                    ...iotSettings.thingspeak,
                    enabled: e.target.checked
                  })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            {iotSettings.thingspeak.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Channel ID</label>
                  <input
                    type="text"
                    value={iotSettings.thingspeak.channelId}
                    onChange={(e) => handleUpdateIoTSection('thingspeak', {
                      ...iotSettings.thingspeak,
                      channelId: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Enter your ThingSpeak Channel ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Read API Key</label>
                  <div className="relative">
                    <input
                      type={showReadKey ? "text" : "password"}
                      value={iotSettings.thingspeak.readApiKey}
                      onChange={(e) => handleUpdateIoTSection('thingspeak', {
                        ...iotSettings.thingspeak,
                        readApiKey: e.target.value
                      })}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      placeholder="Enter your Read API Key"
                    />
                    <button
                      type="button"
                      onClick={() => setShowReadKey(!showReadKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showReadKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Write API Key (Optional)</label>
                  <div className="relative">
                    <input
                      type={showWriteKey ? "text" : "password"}
                      value={iotSettings.thingspeak.writeApiKey}
                      onChange={(e) => handleUpdateIoTSection('thingspeak', {
                        ...iotSettings.thingspeak,
                        writeApiKey: e.target.value
                      })}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      placeholder="Enter your Write API Key"
                    />
                    <button
                      type="button"
                      onClick={() => setShowWriteKey(!showWriteKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showWriteKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={iotSettings.thingspeak.description}
                    onChange={(e) => handleUpdateIoTSection('thingspeak', {
                      ...iotSettings.thingspeak,
                      description: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    rows={2}
                    placeholder="Optional notes about this integration"
                  />
                </div>

                <button
                  onClick={() => handleTestConnection('thingspeak')}
                  disabled={testingConnection === 'thingspeak'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {testingConnection === 'thingspeak' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* AWS IoT Core Configuration */}
          <div className="mb-6 p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">AWS IoT Core</h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-semibold text-gray-700">Enable</span>
                <input
                  type="checkbox"
                  checked={iotSettings.awsIot.enabled}
                  onChange={(e) => handleUpdateIoTSection('awsIot', {
                    ...iotSettings.awsIot,
                    enabled: e.target.checked
                  })}
                  className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                />
              </label>
            </div>

            {iotSettings.awsIot.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">IoT Endpoint</label>
                  <input
                    type="text"
                    value={iotSettings.awsIot.endpoint}
                    onChange={(e) => handleUpdateIoTSection('awsIot', {
                      ...iotSettings.awsIot,
                      endpoint: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="e.g., abc123xyz.iot.us-east-1.amazonaws.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                  <select
                    value={iotSettings.awsIot.region}
                    onChange={(e) => handleUpdateIoTSection('awsIot', {
                      ...iotSettings.awsIot,
                      region: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                  >
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="us-west-2">US West (Oregon)</option>
                    <option value="eu-west-1">Europe (Ireland)</option>
                    <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={iotSettings.awsIot.description}
                    onChange={(e) => handleUpdateIoTSection('awsIot', {
                      ...iotSettings.awsIot,
                      description: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                    rows={2}
                    placeholder="Optional notes about this integration"
                  />
                </div>

                <button
                  onClick={() => handleTestConnection('awsiot')}
                  disabled={testingConnection === 'awsiot'}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {testingConnection === 'awsiot' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Registered Sensors */}
          <div className="p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Registered Sensors</h3>
              <button
                onClick={() => setShowDeviceForm(!showDeviceForm)}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Device
              </button>
            </div>

            {showDeviceForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Device Name</label>
                  <input
                    type="text"
                    value={newDevice.name}
                    onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="e.g., Lobby VOC Sensor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="VOC">VOC Sensor</option>
                    <option value="Water">Water Monitor</option>
                    <option value="Temperature">Temperature</option>
                    <option value="Humidity">Humidity</option>
                    <option value="Multi">Multi-Sensor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="e.g., Main Lobby"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddDevice}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowDeviceForm(false);
                      setNewDevice({ name: '', type: 'VOC', location: '' });
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {iotSettings.devices.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No devices registered yet. Click &quot;Add Device&quot; to get started.</p>
              ) : (
                iotSettings.devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{device.name}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${device.status === 'active' ? 'bg-green-100 text-green-700' :
                            device.status === 'error' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                          }`}>
                          {device.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {device.type} • {device.location}
                      </p>
                      {device.lastReading && (
                        <p className="text-xs text-gray-500 mt-1">
                          Last reading: {new Date(device.lastReading).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveDevice(device.id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
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