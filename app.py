from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os, bcrypt, jwt, datetime, random

load_dotenv()

app = Flask(__name__)
CORS(app)


app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

# =================================================
# DATABASE
# =================================================
client = MongoClient(os.getenv("mongodb+srv://vineetrmandhalkarcse24f_db_user:vhk48gxA2UkYyiB5@cluster0.zsejy0y.mongodb.net/"))
db = client["digilocker"]

users = db["users"]
schemes = db["schemes"]
applications = db["applications"]
otp_sessions = db["otp_sessions"]
help_queries = db["help_queries"]
maytri_logs = db["maytri_chat_logs"]
digilocker_cache = db["digilocker_cache"]
grievances = db["grievances"]

# =================================================
# AUTH HELPER
# =================================================
def authenticate():
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    try:
        return jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
    except:
        return None

@app.route("/")
def index():
    return jsonify({"message": "SevaSetu API is running", "status": "ok"})

@app.route("/languages")
def languages():
    return jsonify([
        {"code": "en", "label": "English"},
        {"code": "hi", "label": "Hindi"},
        {"code": "mr", "label": "Marathi"},
        {"code": "pa", "label": "Punjabi"},
        {"code": "gu", "label": "Gujarati"},
        {"code": "ta", "label": "Tamil"},
        {"code": "te", "label": "Telugu"},
        {"code": "kn", "label": "Kannada"},
        {"code": "gbm", "label": "Garhwali"}
    ])

@app.route("/landing-text")
def landing_text():
    lang = request.args.get("lang", "en")
    text = {
        "en": {"title": "Government Services Portal", "subtitle": "Secure digital citizen services"},
        "hi": {"title": "सरकारी सेवा पोर्टल", "subtitle": "सुरक्षित डिजिटल नागरिक सेवाएँ"},
        "mr": {"title": "शासकीय सेवा पोर्टल", "subtitle": "सुरक्षित डिजिटल नागरिक सेवा"},
        "pa": {"title": "ਸਰਕਾਰੀ ਸੇਵਾ ਪੋਰਟਲ", "subtitle": "ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਨਾਗਰਿਕ ਸੇਵਾਵਾਂ"},
  "gu": {"title": "સરકારી સેવા પોર્ટલ", "subtitle": "સુરક્ષિત ડિજિટલ નાગરિક સેવા"},
  "ta": {"title": "அரசு சேவைகள் போர்டல்", "subtitle": "பாதுகாப்பான டிஜிட்டல் குடிமக்கள் சேவை"},
  "te": {"title": "ప్రభుత్వ సేవల పోర్టల్", "subtitle": "సురక్షితమైన డిజిటల్ పౌర సేవలు"},
  "kn": {"title": "ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಪೋರ್ಟಲ್", "subtitle": "ಸುರಕ್ಷಿತ ಡಿಜಿಟల్ ನಾಗರಿಕ ಸೇವೆ"},
  "gbm": {"title": "सरकारी सेवा पोर्टल", "subtitle": "सुरक्षित डिजिटल नागरिक सेवा"}
    }
    return jsonify(text.get(lang, text["en"]))

# =================================================
# REGISTRATION
# =================================================
@app.route("/register/basic", methods=["POST"])
def register_basic():
    data = request.json
    if users.find_one({"mobile": data["mobile"]}):
        return jsonify({"error": "User already exists"}), 400

    users.insert_one({
        "name": data["name"],
        "mobile": data["mobile"],
        "registered": False,
        "createdAt": datetime.datetime.utcnow()
    })
    return jsonify({"message": "Basic details saved"})

@app.route("/register/identity", methods=["POST"])
def register_identity():
    data = request.json
    digilocker_cache.insert_one({
        "aadhaar": "XXXX-XXXX-" + data["aadhaar"][-4:],
        "pan": data["pan"][:2] + "XXXX" + data["pan"][-2:],
        "verified": True,
        "createdAt": datetime.datetime.utcnow()
    })
    return jsonify({"message": "Identity verified (simulated DigiLocker)"})

@app.route("/otp/send", methods=["POST"])
def send_otp():
    otp = random.randint(100000, 999999)
    otp_sessions.insert_one({
        "mobile": request.json["mobile"],
        "otp": otp,
        "created": datetime.datetime.utcnow()
    })
    print("OTP (DEV):", otp)
    return jsonify({"message": "OTP sent"})

@app.route("/otp/verify", methods=["POST"])
def verify_otp():
    data = request.json
    record = otp_sessions.find_one({"mobile": data["mobile"]}, sort=[("_id", -1)])

    if not record:
        return jsonify({"error": "OTP not found"}), 400

    if datetime.datetime.utcnow() - record["created"] > datetime.timedelta(minutes=5):
        return jsonify({"error": "OTP expired"}), 400

    if record["otp"] != int(data["otp"]):
        return jsonify({"error": "Invalid OTP"}), 400

    users.update_one(
        {"mobile": data["mobile"]},
        {"$set": {
            "password": bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt()),
            "role": "citizen",
            "registered": True
        }}
    )
    return jsonify({"message": "Registration completed"})

# =================================================
# LOGIN
# =================================================
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"mobile": data["mobile"]})

    if not user or not user.get("registered"):
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.checkpw(data["password"].encode(), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "mobile": user["mobile"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, app.config["SECRET_KEY"], algorithm="HS256")

    return jsonify({"token": token})

# =================================================
# DASHBOARD
# =================================================
@app.route("/profile")
def profile():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401
    user = users.find_one({"mobile": auth["mobile"]}, {"_id": 0, "password": 0})
    return jsonify(user)

@app.route("/schemes/all")
def all_schemes():
    return jsonify(list(schemes.find({}, {"_id": 0})))

@app.route("/schemes/applicable")
def applicable_schemes():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401
    return jsonify(list(schemes.find({}, {"_id": 0})))

@app.route("/schemes/apply", methods=["POST"])
def apply_scheme():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401

    applications.insert_one({
        "mobile": auth["mobile"],
        "scheme_id": request.json["scheme_id"],
        "status": "Pending",
        "applied_at": datetime.datetime.utcnow()
    })
    return jsonify({"message": "Scheme applied successfully"})

@app.route("/schemes/applied")
def applied_schemes():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401
    return jsonify(list(applications.find({"mobile": auth["mobile"]}, {"_id": 0})))

@app.route("/help", methods=["POST"])
def help_page():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401
    help_queries.insert_one({
        "mobile": auth["mobile"],
        "message": request.json["message"],
        "createdAt": datetime.datetime.utcnow()
    })
    return jsonify({"message": "Help request submitted"})

# =================================================
# 🤖 MAYTRI – GLOBAL AI AGENT
# =================================================
@app.route("/maytri/chat", methods=["POST"])
def maytri():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401

    msg = request.json["message"].lower()

    if "scheme" in msg:
        reply = "You can explore schemes in All Schemes or Applicable Schemes."
    elif "apply" in msg:
        reply = "Select a scheme and click Apply to submit."
    elif "grievance" in msg:
        reply = "Explain your issue clearly. I will help you draft it."
    elif "profile" in msg:
        reply = "Your personal details are available under My Profile."
    else:
        reply = "Hello! I am Maytri, your digital assistant."

    maytri_logs.insert_one({
        "mobile": auth["mobile"],
        "user_msg": msg,
        "reply": reply,
        "time": datetime.datetime.utcnow()
    })

    return jsonify({"reply": reply})

# =================================================
# GRIEVANCE PAGE (FINAL MODULE)
# =================================================
@app.route("/grievance/submit", methods=["POST"])
def submit_grievance():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401

    grievance_text = request.json.get("grievance", "")

    if len(grievance_text) < 10:
        return jsonify({"error": "Grievance too short"}), 400

    if len(grievance_text) > 5000:
        return jsonify({"error": "Grievance exceeds 5000 word limit"}), 400

    grievances.insert_one({
        "mobile": auth["mobile"],
        "grievance_text": grievance_text,
        "status": "Submitted",
        "maytri_consulted": request.json.get("maytri_used", False),
        "submitted_at": datetime.datetime.utcnow()
    })

    return jsonify({"message": "Grievance successfully submitted to Government"})

@app.route("/grievance/my")
def my_grievances():
    auth = authenticate()
    if not auth: return jsonify({"error": "Unauthorized"}), 401
    return jsonify(list(grievances.find({"mobile": auth["mobile"]}, {"_id": 0})))

# =================================================
# SPEECH SUPPORT (MOCK)
# =================================================
@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    return jsonify({"text": "mock speech to text"})

@app.route("/text-to-speech", methods=["POST"])
def text_to_speech():
    return jsonify({"audio": "mock audio"})

# =================================================
# RUN SERVER
# =================================================
if __name__ == "__main__":
    app.run(debug=True, port=5001)



#mongodb connection link: mongodb+srv://vineetrmandhalkarcse24f_db_user:vhk48gxA2UkYyiB5@cluster0.zsejy0y.mongodb.net/ 