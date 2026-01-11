import axios from 'axios';

// Uses the environment variable defined above
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  getEvents: async () => {
    try {
      // Fetches from /api/events
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  subscribe: async (email) => {
    try {
      // Posts to /api/subscribe
      const response = await axios.post(`${API_URL}/subscribe`, { email });
      return response.data;
    } catch (error) {
      console.error("Error subscribing:", error);
      throw error;
    }
  }
};