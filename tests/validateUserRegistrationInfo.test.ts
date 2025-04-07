import { validateUserRegistrationInfo } from "../src/controllers/authController";
import { User } from "../src/interfaces/user";
import mongoose from "mongoose";

// test valid registration
test("Valid registration info should pass", () => {
    // Arrange
    const validUser = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Lara Johnson",
        email: "lara.johnson@example.com",
        password: "SecurePass123!",
        registerDate: new Date()
    } as unknown as User;

    // Act
    const { error } = validateUserRegistrationInfo(validUser);

    // Assert
    expect(error).toBeUndefined(); // No error should occur for valid input
});

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