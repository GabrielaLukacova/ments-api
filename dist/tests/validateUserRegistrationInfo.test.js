"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../src/controllers/authController");
const mongoose_1 = __importDefault(require("mongoose"));
// test valid registration
test("Valid registration info should pass", () => {
    // Arrange
    const validUser = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        name: "Lara Johnson",
        email: "lara.johnson@example.com",
        password: "SecurePass123!",
        registerDate: new Date()
    };
    // Act
    const { error } = (0, authController_1.validateUserRegistrationInfo)(validUser);
    // Assert
    expect(error).toBeUndefined(); // No error should occur for valid input
});
// test for empty name
test("Empty name should fail validation", () => {
    // Arrange
    const invalidUser = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        name: "",
        email: "john.smith@example.com",
        password: "Password123456!",
        registerDate: new Date()
    };
    // Act
    const { error } = (0, authController_1.validateUserRegistrationInfo)(invalidUser);
    // Assert
    expect(error).not.toBeUndefined(); // Error should occur
    expect(error === null || error === void 0 ? void 0 : error.details[0].message).toBe('"name" is not allowed to be empty');
});
//# sourceMappingURL=validateUserRegistrationInfo.test.js.map