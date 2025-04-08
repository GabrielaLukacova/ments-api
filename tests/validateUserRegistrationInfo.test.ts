import { validateUserRegistrationInfo } from "../src/controllers/authController";
import { User } from "../src/interfaces/user";
import mongoose from "mongoose";

// test for empty name
test("Empty name should fail validation", () => {
    // Arrange
    const invalidUser= {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "",
        email: "john.smith@example.com",
        password: "Password123456!",
        registerDate: new Date()
    }as unknown as User;

    // Act
    const { error } = validateUserRegistrationInfo(invalidUser);

    // Assert
    expect(error).not.toBeUndefined(); // Error should occur
    expect(error?.details[0].message).toBe('"name" is not allowed to be empty');
});