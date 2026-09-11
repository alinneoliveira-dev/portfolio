from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from pathlib import Path
from html import escape
import os
import resend

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

app = Flask(
    __name__,
    template_folder=BASE_DIR / "templates",
    static_folder=BASE_DIR / "static"
)

resend.api_key = os.getenv("RESEND_API_KEY")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Dados não enviados."
        }), 400

    name_raw = data.get("name", "").strip()
    email_raw = data.get("email", "").strip()
    message_raw = data.get("message", "").strip()

    if not name_raw or not email_raw or not message_raw:
        return jsonify({
            "success": False,
            "message": "Preencha todos os campos."
        }), 400

    if "@" not in email_raw:
        return jsonify({
            "success": False,
            "message": "Digite um e-mail válido."
        }), 400

    if not resend.api_key:
        return jsonify({
            "success": False,
            "message": "Chave da API do Resend não configurada."
        }), 500

    name = escape(name_raw)
    email = escape(email_raw)
    message = escape(message_raw).replace("\n", "<br>")

    try:
        params = {
            "from": "Portfolio <onboarding@resend.dev>",
            "to": ["alinnesoliveira13@gmail.com"],
            "reply_to": email_raw,
            "subject": f"Contato pelo portfólio - {name_raw}",
            "html": f"""
                <h2>Novo contato pelo portfólio</h2>

                <p><strong>Nome:</strong> {name}</p>
                <p><strong>E-mail:</strong> {email}</p>

                <p><strong>Mensagem:</strong></p>
                <p>{message}</p>
            """
        }

        resend.Emails.send(params)

        return jsonify({
            "success": True,
            "message": "Mensagem enviada com sucesso!"
        })

    except Exception as error:
        print("Erro ao enviar e-mail:", error)

        return jsonify({
            "success": False,
            "message": "Não foi possível enviar a mensagem."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)