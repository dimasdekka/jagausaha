"""
Comprehensive Test Suite for JagaUsaha Authentication & User Management Engine
Enforces TDD invariants: PBKDF2-HMAC-SHA256, session tokens, duplicate guards.
"""

import unittest
import secrets
from core.auth import (
    register_user,
    login_user,
    get_user_by_token,
    hash_password,
    verify_password,
    init_auth_db,
)


class TestAuthEngine(unittest.TestCase):
    def setUp(self):
        init_auth_db()
        self.test_email = f"test_{secrets.token_hex(4)}@kopijaya.id"
        self.test_password = "password123"
        self.test_name = "Budi Hartono (Kopi Jaya)"

    def test_password_hashing_and_verification(self):
        pw = "superSecret2026!"
        h1 = hash_password(pw)
        h2 = hash_password(pw)
        # Salt must be randomized, so two hashes of same password must differ
        self.assertNotEqual(h1, h2)
        # Verification must pass for both
        self.assertTrue(verify_password(pw, h1))
        self.assertTrue(verify_password(pw, h2))
        # Wrong password must fail
        self.assertFalse(verify_password("wrongPassword", h1))

    def test_register_new_user_success(self):
        res = register_user(
            email=self.test_email,
            password=self.test_password,
            full_name=self.test_name,
            phone="081299998888",
        )
        self.assertEqual(res["status"], "success")
        self.assertIn("token", res)
        self.assertEqual(len(res["token"]), 64)  # 32-byte hex = 64 chars
        self.assertEqual(res["user"]["email"], self.test_email)
        self.assertEqual(res["user"]["full_name"], self.test_name)

    def test_register_duplicate_email_rejected(self):
        register_user(
            email=self.test_email,
            password=self.test_password,
            full_name=self.test_name,
        )
        with self.assertRaises(ValueError) as ctx:
            register_user(
                email=self.test_email,
                password="anotherPassword",
                full_name="Duplicate User",
            )
        self.assertIn("sudah terdaftar", str(ctx.exception).lower())

    def test_register_short_password_rejected(self):
        with self.assertRaises(ValueError) as ctx:
            register_user(
                email="short@test.com",
                password="123",
                full_name="Short PW",
            )
        self.assertIn("minimal 6 karakter", str(ctx.exception).lower())

    def test_register_invalid_email_rejected(self):
        with self.assertRaises(ValueError) as ctx:
            register_user(
                email="not-an-email",
                password="validPassword123",
                full_name="Invalid Email",
            )
        self.assertIn("email tidak valid", str(ctx.exception).lower())

    def test_login_success_and_token_validation(self):
        reg = register_user(
            email=self.test_email,
            password=self.test_password,
            full_name=self.test_name,
        )
        # Now login
        login_res = login_user(self.test_email, self.test_password)
        self.assertEqual(login_res["status"], "success")
        self.assertIn("token", login_res)

        # Validate token via get_user_by_token
        user = get_user_by_token(login_res["token"])
        self.assertIsNotNone(user)
        self.assertEqual(user["email"], self.test_email)
        self.assertEqual(user["full_name"], self.test_name)

    def test_login_wrong_password_rejected(self):
        register_user(
            email=self.test_email,
            password=self.test_password,
            full_name=self.test_name,
        )
        with self.assertRaises(ValueError) as ctx:
            login_user(self.test_email, "completelyWrongPassword")
        self.assertIn("password salah", str(ctx.exception).lower())

    def test_login_unregistered_email_rejected(self):
        with self.assertRaises(ValueError) as ctx:
            login_user("unknown_user_9999@test.com", "anyPassword")
        self.assertIn("belum terdaftar", str(ctx.exception).lower())

    def test_invalid_token_returns_none(self):
        user = get_user_by_token("fake_token_that_does_not_exist_in_db")
        self.assertIsNone(user)


if __name__ == "__main__":
    unittest.main()
