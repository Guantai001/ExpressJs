const {authRegisterController} = require('../../controllers/auth');
const User = require('../../database/schemas/User');

jest.mock('../../database/schemas/User');
const request = {
    body: {
      email: 'fake_email',
      password: 'fake_password',
    },
  };

  const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
    };


  

it('should return 400 if email is already in use', async () => {
    User.findOne.mockImplementationOnce(() => {
        id = 1;
        email = 'fake_email';
        password = 'fake_password';
    });
    await authRegisterController(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
});

it('should return 200 if email is not in use', async () => {});
