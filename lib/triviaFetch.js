import axios from 'axios';

const fetchTrivia = async (amount = 10, difficulty = 'easy', type = 'multiple') => {
  try {
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount,
        difficulty,
        type,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    return [];
  }
};

export default fetchTrivia;
