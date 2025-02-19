export const analyzeInfoApi = async (text, dispatch) => {
    dispatch(analyzeRequest());
  
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q=ghazipur&appid=b13b9168acf4508c03798d8a61654ad2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      dispatch(analyzeSuccess(data));
    } catch (error) {
      dispatch(analyzeFailure());
    }
};
  