export const PasswordResetService = jest.fn().mockReturnValue({
  forgotPassword: jest.fn().mockResolvedValue(''),
});
