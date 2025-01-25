import axios from 'axios';
import { createUserAPI } from './api';

jest.mock('axios');

describe('createUserAPI', () => {
  const mockFormData = {
    fullName: 'Manoj Gupta',
    contactNumber: '9876543210',
    email: 'manoj@example.com',
    day: '01',
    month: '01',
    year: '1990',
    password: 'Manoj123!@#'
  };

  const expectedRequestData = {
    full_name: 'Manoj Gupta',
    contact_number: '9876543210',
    email: 'manoj@example.com',
    date_of_birth: '01-01-1990',
    password: 'Manoj123!@#'
  };

  it('should successfully create a user', async () => {
    const mockResponse = { data: { message: 'User created successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    const response = await createUserAPI(mockFormData);

    expect(axios.post).toHaveBeenCalledWith(
      'https://fullstack-test-navy.vercel.app/api/users/create',
      expectedRequestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    axios.post.mockRejectedValue(mockError);

    await expect(createUserAPI(mockFormData)).rejects.toThrow('API Error');
  });

  it('should format date correctly', async () => {
    const mockResponse = { data: { message: 'User created successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    await createUserAPI(mockFormData);

    const calledWith = axios.post.mock.calls[0][1];
    expect(calledWith.date_of_birth).toBe('01-01-1990');
  });
});
