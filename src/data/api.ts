// const api = process.env.NEXT_PUBLIC_API_URL;
// const next = process.env.NEXT_PUBLIC_HOST + '/api';

// type params = string | number;

// paths of api call's urls
export const __API = {
  nextjs: {
    login: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/usr/auth/login/`,
  },
  auth: {
    login: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/usr/auth/login/`,
    signup: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/usr/auth/signup/`,
    profile: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/usr/profile/`,
  },
};
