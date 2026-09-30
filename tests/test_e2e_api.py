"""
E2E API Test Suite for JagaUsaha Authentication, User Management, and Ingestion APIs.
Tests live HTTP endpoints against both local environment and CloudBaik VPS.
"""

import unittest
import urllib.request
import urllib.error
import json
import secrets


class TestE2EAuthAPI(unittest.TestCase):
    BASE_URL = "http://localhost:8000"

    def setUp(self):
        self.test_email = f"owner_{secrets.token_hex(4)}@kopibali.id"
        self.test_password = "securePassword2026!"
        self.test_name = "Wayan Subagio (Kopi Bali Mandiri)"
        self.test_phone = "081234567890"

    def _post(self, endpoint, data, token=None):
        url = f"{self.BASE_URL}{endpoint}"
        payload = json.dumps(data).encode("utf-8")
        headers = {"Content-Type": "application/json"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                return resp.status, json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read().decode("utf-8"))

    def _get(self, endpoint, token=None):
        url = f"{self.BASE_URL}{endpoint}"
        headers = {}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        req = urllib.request.Request(url, headers=headers, method="GET")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                return resp.status, json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read().decode("utf-8"))

    def test_01_health_check(self):
        status, body = self._get("/api/health")
        self.assertEqual(status, 200)
        self.assertEqual(body.get("status"), "healthy")
        self.assertEqual(body.get("app"), "JagaUsaha")

    def test_02_register_success(self):
        status, body = self._post("/api/auth/register", {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
            "phone": self.test_phone,
        })
        self.assertEqual(status, 200)
        self.assertEqual(body.get("status"), "success")
        self.assertIn("token", body)
        self.assertEqual(body["user"]["email"], self.test_email)
        self.assertEqual(body["user"]["full_name"], self.test_name)

    def test_03_register_duplicate_rejected(self):
        # Register first
        self._post("/api/auth/register", {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
        })
        # Attempt duplicate
        status, body = self._post("/api/auth/register", {
            "email": self.test_email,
            "password": "anotherPassword",
            "full_name": "Another Name",
        })
        self.assertEqual(status, 400)
        self.assertIn("sudah terdaftar", body.get("detail", "").lower())

    def test_04_login_success(self):
        # Register user
        self._post("/api/auth/register", {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
        })
        # Login
        status, body = self._post("/api/auth/login", {
            "email": self.test_email,
            "password": self.test_password,
        })
        self.assertEqual(status, 200)
        self.assertEqual(body.get("status"), "success")
        self.assertIn("token", body)
        self.assertEqual(body["user"]["email"], self.test_email)

    def test_05_login_wrong_password_rejected(self):
        self._post("/api/auth/register", {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
        })
        status, body = self._post("/api/auth/login", {
            "email": self.test_email,
            "password": "wrongPassword123",
        })
        self.assertEqual(status, 401)
        self.assertIn("password salah", body.get("detail", "").lower())

    def test_06_login_unregistered_email_rejected(self):
        status, body = self._post("/api/auth/login", {
            "email": "ghost_user_does_not_exist@domain.com",
            "password": "somePassword",
        })
        self.assertEqual(status, 401)
        self.assertIn("belum terdaftar", body.get("detail", "").lower())

    def test_07_get_current_user_with_token(self):
        # Register and get token
        _, reg_body = self._post("/api/auth/register", {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
        })
        token = reg_body["token"]

        # Call /api/auth/me with Bearer token
        status, body = self._get("/api/auth/me", token=token)
        self.assertEqual(status, 200)
        self.assertEqual(body["user"]["email"], self.test_email)
        self.assertEqual(body["user"]["full_name"], self.test_name)

    def test_08_get_current_user_unauthorized_without_token(self):
        status, body = self._get("/api/auth/me")
        self.assertEqual(status, 401)

    def test_09_get_current_user_unauthorized_with_invalid_token(self):
        status, body = self._get("/api/auth/me", token="fake_invalid_token_12345")
        self.assertEqual(status, 401)


class TestE2EVPSAuthAPI(TestE2EAuthAPI):
    """Run the exact same rigorous API suite against the live CloudBaik VPS."""
    BASE_URL = "http://103.30.146.174:8000"


if __name__ == "__main__":
    unittest.main()
