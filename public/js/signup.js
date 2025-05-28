/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (data) => {
  try {
    // Dont use formdata
    const result = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data,
    });

    if (result.data.status === 'success') {
      showAlert(
        'success',
        'Thank you for your interest! Now you can proceed to login'
      );
      setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
