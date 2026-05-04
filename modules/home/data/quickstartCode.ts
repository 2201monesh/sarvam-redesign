export const CODE_LINES = [
  { tokens: [{ text: "import ", color: "#7c3aed" }, { text: "requests", color: "#1e293b" }] },
  { tokens: [] },
  { tokens: [{ text: "API_KEY", color: "#2563eb" }, { text: " = ", color: "#0891b2" }, { text: '"your_api_key"', color: "#16a34a" }] },
  { tokens: [{ text: "BASE_URL", color: "#2563eb" }, { text: " = ", color: "#0891b2" }, { text: '"https://api.sarvam.ai/v1"', color: "#16a34a" }] },
  { tokens: [] },
  { tokens: [{ text: "# Convert text to natural speech", color: "#94a3b8" }] },
  { tokens: [{ text: "response", color: "#1e293b" }, { text: " = ", color: "#0891b2" }, { text: "requests", color: "#1e293b" }, { text: ".", color: "#0891b2" }, { text: "post", color: "#2563eb" }, { text: "(", color: "#1e293b" }] },
  { tokens: [{ text: "    f", color: "#1e293b" }, { text: '"{BASE_URL}/text-to-speech"', color: "#16a34a" }, { text: ",", color: "#1e293b" }] },
  { tokens: [{ text: "    headers", color: "#1e293b" }, { text: "={", color: "#0891b2" }, { text: '"API-Subscription-Key"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: "API_KEY", color: "#2563eb" }, { text: "},", color: "#1e293b" }] },
  { tokens: [{ text: "    json", color: "#1e293b" }, { text: "={", color: "#0891b2" }] },
  { tokens: [{ text: '        "inputs"', color: "#16a34a" }, { text: ": [{", color: "#1e293b" }, { text: '"text"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"नमस्ते, मैं सर्वम AI हूँ"', color: "#16a34a" }, { text: "}],", color: "#1e293b" }] },
  { tokens: [{ text: '        "target_language_code"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"hi-IN"', color: "#16a34a" }, { text: ",", color: "#1e293b" }] },
  { tokens: [{ text: '        "speaker"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"anushka"', color: "#16a34a" }] },
  { tokens: [{ text: "    }", color: "#1e293b" }] },
  { tokens: [{ text: ")", color: "#1e293b" }] },
  { tokens: [] },
  { tokens: [{ text: "print", color: "#2563eb" }, { text: "(", color: "#1e293b" }, { text: "response", color: "#1e293b" }, { text: ".", color: "#0891b2" }, { text: "json", color: "#2563eb" }, { text: "())", color: "#1e293b" }] },
];

export const PLAIN_CODE = `import requests

API_KEY = "your_api_key"
BASE_URL = "https://api.sarvam.ai/v1"

# Convert text to natural speech
response = requests.post(
    f"{BASE_URL}/text-to-speech",
    headers={"API-Subscription-Key": API_KEY},
    json={
        "inputs": [{"text": "नमस्ते, मैं सर्वम AI हूँ"}],
        "target_language_code": "hi-IN",
        "speaker": "anushka"
    }
)

print(response.json())`;
