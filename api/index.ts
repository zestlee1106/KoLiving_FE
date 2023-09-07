// TODO: 일단은 로컬로 한다
const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(`${baseURL}${url}`, options);

    if (response.status === 204) {
      // error is: "Type 'null' is not assignable to type 'T'."
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};
