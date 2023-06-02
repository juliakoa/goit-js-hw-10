const api_key =
  'live_6SiuzLf6kQK5Pf4UjmpMQFcDsnMn8taqVOQxETPsRSqGtZLU5Q51W21F9u11IgJt';

export async function fetchBreeds() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': api_key,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }

    const breeds = await response.json();
    return breeds;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': api_key,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cat information');
    }

    const catData = await response.json();
    return catData;
  } catch (error) {
    throw new Error('Failed to fetch cat information');
  }
}
